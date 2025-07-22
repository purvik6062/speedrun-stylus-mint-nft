import { useQuery } from "@tanstack/react-query";

interface ChallengeDetail {
  id: string;
  completed: boolean;
  details: {
    challengeId: string;
    reviewAction: string;
    submittedAt: string;
  } | null;
}

interface EligibilityData {
  isEligible: boolean;
  userAddress: string;
  totalCompletedChallenges: number;
  completedRequiredChallenges: number;
  requiredChallenges: number;
  challengeDetails: ChallengeDetail[];
}

export function useEligibility(userAddress: string | null) {
  return useQuery<EligibilityData>({
    queryKey: ["eligibility", userAddress],
    queryFn: async () => {
      if (!userAddress) {
        throw new Error("User address is required");
      }

      const response = await fetch("/api/check-eligibility", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userAddress }),
      });

      if (!response.ok) {
        throw new Error("Failed to check eligibility");
      }

      return response.json();
    },
    enabled: !!userAddress,
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 2,
  });
}
