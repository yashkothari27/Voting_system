// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

contract Voting {
    struct Candidate {
        uint256 id;
        string name;
        uint256 voteCount;
    }
    
    struct Voter {
        bool isRegistered;
        bool hasVoted;
        uint256 votedCandidateId;
    }
    
    address public admin;
    mapping(address => Voter) public voters;
    Candidate[] public candidates;
    bool public votingOpen;
    mapping(address => bool) public voterVerified;
    uint256 public totalVotes;
    uint256 public votingStartTime;
    uint256 public votingEndTime;
    
    event VoterRegistered(address indexed voter);
    event VoteCast(address indexed voter, uint256 indexed candidateId);
    event VotingStarted(uint256 startTime, uint256 endTime);
    event VotingEnded(uint256 endTime);
    event CandidateAdded(uint256 indexed candidateId, string name);
    
    modifier onlyAdmin() {
        require(msg.sender == admin, "Only admin can perform this action");
        _;
    }
    
    modifier votingIsOpen() {
        require(votingOpen, "Voting is not open");
        require(block.timestamp <= votingEndTime, "Voting period has ended");
        _;
    }
    
    modifier onlyVerifiedVoter() {
        require(voterVerified[msg.sender], "Voter not verified");
        _;
    }
    
    constructor() {
        admin = msg.sender;
        votingOpen = false;
    }
    
    function addCandidate(string memory _name) external onlyAdmin {
        require(!votingOpen, "Cannot add candidate while voting is open");
        require(bytes(_name).length > 0, "Candidate name cannot be empty");
        
        uint256 candidateId = candidates.length;
        candidates.push(Candidate({
            id: candidateId,
            name: _name,
            voteCount: 0
        }));
        
        emit CandidateAdded(candidateId, _name);
    }
    
    function registerVoter(address _voter) external onlyAdmin {
        require(_voter != address(0), "Invalid voter address");
        require(!voters[_voter].isRegistered, "Voter already registered");
        require(!voterVerified[_voter], "Voter already verified");
        
        voters[_voter].isRegistered = true;
        voterVerified[_voter] = true;
        
        emit VoterRegistered(_voter);
    }
    
    function startVoting(uint256 _durationInMinutes) external onlyAdmin {
        require(!votingOpen, "Voting already started");
        require(candidates.length > 0, "No candidates registered");
        require(_durationInMinutes > 0, "Duration must be greater than 0");
        
        votingStartTime = block.timestamp;
        votingEndTime = block.timestamp + (_durationInMinutes * 1 minutes);
        votingOpen = true;
        
        emit VotingStarted(votingStartTime, votingEndTime);
    }
    
    function castVote(uint256 _candidateId) external votingIsOpen onlyVerifiedVoter {
        require(!voters[msg.sender].hasVoted, "Voter has already voted");
        require(_candidateId < candidates.length, "Invalid candidate ID");
        
        voters[msg.sender].hasVoted = true;
        voters[msg.sender].votedCandidateId = _candidateId;
        candidates[_candidateId].voteCount++;
        totalVotes++;
        
        emit VoteCast(msg.sender, _candidateId);
    }
    
    function endVoting() external onlyAdmin {
        require(votingOpen, "Voting not started");
        require(block.timestamp >= votingEndTime, "Voting period not ended");
        
        votingOpen = false;
        emit VotingEnded(block.timestamp);
    }
    
    function getCandidateCount() external view returns (uint256) {
        return candidates.length;
    }
    
    function getCandidate(uint256 _candidateId) external view returns (
        uint256 id,
        string memory name,
        uint256 voteCount
    ) {
        require(_candidateId < candidates.length, "Invalid candidate ID");
        Candidate memory candidate = candidates[_candidateId];
        return (candidate.id, candidate.name, candidate.voteCount);
    }
    
    function getVotingTimeRemaining() external view returns (uint256) {
        if (!votingOpen || block.timestamp >= votingEndTime) {
            return 0;
        }
        return votingEndTime - block.timestamp;
    }
    
    function getWinner() external view returns (
        uint256 id,
        string memory name,
        uint256 voteCount
    ) {
        require(!votingOpen || block.timestamp >= votingEndTime, "Voting still in progress");
        require(candidates.length > 0, "No candidates registered");
        
        uint256 winningVoteCount = 0;
        uint256 winningCandidateId = 0;
        
        for (uint256 i = 0; i < candidates.length; i++) {
            if (candidates[i].voteCount > winningVoteCount) {
                winningVoteCount = candidates[i].voteCount;
                winningCandidateId = i;
            }
        }
        
        Candidate memory winner = candidates[winningCandidateId];
        return (winner.id, winner.name, winner.voteCount);
    }
} 