# SpeedRun Stylus NFT Mint App

A Next.js 15 application that allows users to mint NFTs after completing the first three SpeedRun Stylus challenges.

## Features

- 🔗 **Privy Wallet Integration**: Secure wallet connection using Privy
- 🏆 **Challenge Verification**: Automatically checks completion of the first 3 SpeedRun Stylus challenges
- 🎨 **Beautiful UI**: Modern gradient design with responsive layout
- 🗄️ **PostgreSQL Integration**: Uses Drizzle ORM for database operations
- ⚡ **Real-time Status**: Dynamic progress tracking and eligibility checking
- 🎖️ **NFT Minting**: Mint exclusive NFT badges for challenge completion

## Required Challenges

To be eligible for NFT minting, users must complete these challenges with "ACCEPTED" status:

1. **Simple Counter Example** (`simple-counter-example`)
2. **Simple NFT Example** (`simple-nft-example`)
3. **Vending Machine** (`vending-machine`)

## Setup Instructions

### 1. Environment Variables

Create a `.env.local` file in the root directory:

```env
# Database URL (already configured for your Neon database)
POSTGRES_URL="postgresql://neondb_owner:npg_T1IcufZn2bxv@ep-weathered-sunset-a46hr45i-pooler.us-east-1.aws.neon.tech/neondb?sslmode=require"

# Privy Configuration
NEXT_PUBLIC_PRIVY_APP_ID="your-privy-app-id-here"
```

### 2. Get Privy App ID

1. Go to [Privy Dashboard](https://dashboard.privy.io)
2. Create a new app or use an existing one
3. Copy your App ID
4. Replace `your-privy-app-id-here` in `.env.local` with your actual App ID

### 3. Install Dependencies & Run

```bash
# Install dependencies (already done)
npm install

# Start the development server
npm run dev
```

The app will be available at `http://localhost:3000`

## How It Works

### 1. Wallet Connection

- Users connect their wallet using Privy
- Supports both external wallets and embedded wallets
- Secure authentication flow

### 2. Challenge Verification

- App queries the PostgreSQL database for user submissions
- Checks for completion of the required 3 challenges
- Verifies that submissions have "ACCEPTED" review status
- Displays real-time progress with visual indicators

### 3. NFT Minting

- Mint button appears only when all conditions are met
- Currently shows a placeholder implementation
- Ready to integrate actual NFT minting logic

## Database Schema

The app uses the existing `user_challenges` table with the following key fields:

- `user_address`: Ethereum wallet address
- `challenge_id`: ID of the completed challenge
- `review_action`: Status (REJECTED, ACCEPTED, SUBMITTED)
- `submitted_at`: Timestamp of submission

## API Endpoints

### POST `/api/check-eligibility`

Checks if a user is eligible for NFT minting.

**Request Body:**

```json
{
  "userAddress": "0x..."
}
```

**Response:**

```json
{
  "isEligible": boolean,
  "userAddress": string,
  "completedChallenges": number,
  "requiredChallenges": number,
  "challengeDetails": [
    {
      "id": string,
      "completed": boolean,
      "details": object | null
    }
  ]
}
```

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Authentication**: Privy
- **Database**: PostgreSQL with Drizzle ORM
- **Styling**: Tailwind CSS
- **State Management**: React Query (TanStack Query)
- **TypeScript**: Full type safety

## Development

### Project Structure

```
src/
├── app/
│   ├── api/check-eligibility/    # API route for eligibility checking
│   ├── layout.tsx                # Root layout with providers
│   └── page.tsx                  # Main homepage component
├── components/
│   └── providers.tsx             # Privy and React Query providers
├── hooks/
│   └── useEligibility.ts         # Custom hook for eligibility checking
└── lib/
    ├── database/
    │   ├── client.ts             # Database client configuration
    │   └── schema.ts             # Database schema definitions
    └── privy/
        └── config.ts             # Privy configuration
```

### Adding NFT Minting Logic

To implement actual NFT minting, update the `handleMint` function in `src/app/page.tsx`:

```typescript
const handleMint = async () => {
  setIsMinting(true);
  try {
    // Add your NFT minting logic here
    // For example:
    // - Create contract instance
    // - Call mint function
    // - Handle transaction
    // - Update UI with success/failure
  } catch (error) {
    console.error("Minting failed:", error);
    // Handle error
  } finally {
    setIsMinting(false);
  }
};
```

## Next Steps

1. **Set up Privy App ID** in environment variables
2. **Test wallet connection** and challenge verification
3. **Implement actual NFT minting** logic
4. **Deploy to production** (Vercel recommended)

## Support

For issues or questions:

- Check the [Privy Documentation](https://docs.privy.io)
- Review the [Next.js Documentation](https://nextjs.org/docs)
- Ensure database connection is working properly


