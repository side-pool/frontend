import { useQuery } from 'react-query';
import { HashTagInfo } from '@src/models';
import { getApiInstance } from '@src/utils/context';

const HASH_CIRCLE_LEN = 10;
const SMALL_PART_LEN = 3;

export const useGetHashTags = () =>
  useQuery(
    ['/hashtags'],
    async ({ queryKey: [url] }) => {
      if (typeof url === 'string') {
        const { data: responseData } = await getApiInstance().get<
          HashTagInfo[]
        >(url);

        // 오름차순 정렬
        responseData.sort((a, b) => a.count - b.count);
        const smallPart = responseData.splice(0, SMALL_PART_LEN);

        return responseData.length < HASH_CIRCLE_LEN
          ? responseData
          : [
              ...smallPart,
              ...responseData.slice(
                responseData.length - HASH_CIRCLE_LEN + smallPart.length,
              ),
            ];
      }
    },
    {
      refetchOnWindowFocus: false,
      staleTime: Infinity,
    },
  );
