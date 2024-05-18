/** @type {import('next').NextConfig} */
const nextConfig = {
    // to allow read images from this url
    images:{
        remotePatterns:[{ hostname: "images.unsplash.com" }]
    },
    // to allow server action 
    experimental:{
        serverActions: true
    }
};

export default nextConfig;
