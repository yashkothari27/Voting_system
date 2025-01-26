# Deployment Guide for Hostinger

## Prerequisites
- Node.js 16+ installed
- npm or yarn package manager
- Hostinger hosting account
- FTP access to your Hostinger account

## Deployment Steps

1. Set up environment variables:
   - Copy `.env.production` to your project root
   - Update the variables with your production values

2. Build the project:
   ```bash
   npm run build
   ```

3. Upload to Hostinger:
   - Connect to your Hostinger account via FTP
   - Upload the contents of the `dist` folder to your `public_html` directory
   - Upload the `.htaccess` file to your `public_html` directory

4. Configure Hostinger:
   - Enable SSL certificate in Hostinger dashboard
   - Set up domain pointing if needed
   - Enable mod_rewrite in Apache settings

5. Test the deployment:
   - Visit your domain
   - Test all features
   - Check console for any errors

## Troubleshooting

If you encounter issues:

1. Check the browser console for errors
2. Verify environment variables are set correctly
3. Ensure .htaccess file is properly uploaded
4. Check Hostinger error logs
5. Verify SSL certificate is active

## Maintenance

To update the deployment:

1. Make your changes locally
2. Test thoroughly
3. Run `npm run build`
4. Upload new dist files to Hostinger 