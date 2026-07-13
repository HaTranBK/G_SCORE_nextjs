import { useQuery } from "@tanstack/react-query";
import { getTopStudents, TopStudentDto } from "@/services/api/dashboard/get-top-students";

export function useGetTopStudents(limit = 10) {
  return useQuery<TopStudentDto[], Error>({
    queryKey: ["topStudents", "A", limit],
    queryFn: () => getTopStudents(limit),
    staleTime: 1000 * 60 * 30, // 30 minutes
    refetchOnWindowFocus: false,
  });
}
