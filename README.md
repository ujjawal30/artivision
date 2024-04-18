# ArtiVision

ArtiVision is a credits-powered platform that leverages Cloudinary AI for various image enhancement and manipulation tasks including image restoration, AI-based resizing/refilling, object recoloring, object removal, and background removal.

## Technologies Used

- **Next.js 14**
- **Cloudinary AI**
- **MongoDB**
- **Tailwind CSS**
- **Shadcn UI**
- **Clerk**
- **Stripe**

## Features

- **Image Restoration:** Restore old or damaged images to their original quality using Cloudinary AI.
- **AI Resize/Refill:** Resize images intelligently while maintaining quality and filling in missing parts using AI.
- **Object Recolor:** Change the color of objects in images with precision using Cloudinary AI.
- **Object Removal:** Remove unwanted objects seamlessly from images using advanced algorithms.
- **Background Removal:** Easily remove backgrounds from images, allowing for easy integration into various contexts.

## Deployed Application

This application is deployed and accessible here.

[artivision-web.vercel.app](https://artivision-web.vercel.app/)

## Getting Started

To get started with this project, follow these steps:

1. **Clone the repository**: Clone this repository to your local machine using the following command:

   ```
   https://github.com/ujjawal30/artivision.git
   ```

2. **Install dependencies**: Navigate to the project directory and install the necessary dependencies using npm or yarn:

   ```
   cd artivision
   npm install
   ```

3. **Set up environment variables**: Create a `.env.local` file in the root of your project and add the following environment variables:

   ```
   NEXT_PUBLIC_SITE_URL=http://localhost:3000

   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
   CLERK_SECRET_KEY=
   CLERK_WEBHOOK_SECRET_KEY=

   NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
   NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-up
   NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
   NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/dashboard

   MONGODB_URI=
    
   NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=
   CLOUDINARY_API_KEY=
   CLOUDINARY_API_SECRET=

   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
   STRIPE_API_KEY=
   STRIPE_WEBHOOK_SECRET_KEY=
   ```

4. **Start the development server**: Once the dependencies are installed and environment variables are set, start the development server using the following command:

   ```
   npm run dev
   ```

5. **Access the application**: Open your web browser and navigate to `http://localhost:3000` to access the ArtiVision application.

## Contributors

- [Ujjawal Gupta](https://github.com/ujjawal30)
