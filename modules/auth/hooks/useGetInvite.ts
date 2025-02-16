import { Invite } from "@/types/inviteTypes";
import { getQueryString, pageFetcher } from "@/utils/apiUtils";
import { PaginationType } from "@/utils/pagination";
import { useQuery } from "@tanstack/react-query";

const getInvite = async ({ inviteId }: { inviteId: string }) => ({
    id: "213312321",
    email: "murer@bruno.com",

}) as  Invite
//   pageFetcher({
//     endPoint: `api/invites/${inviteId}`,
//     method: "GET",
//   });

export const useGetInvite = ({ inviteId }: { inviteId: string }) => {
  return useQuery({
    queryKey: ["invite", inviteId],
    queryFn: () => getInvite({ inviteId }),
  });
};
