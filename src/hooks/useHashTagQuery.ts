import { useQuery } from 'react-query';
import { HashTagInfo } from '@src/models';
import { getApiInstance } from '@src/utils/context';

const HASH_CIRCLE_LEN = 10;

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

        return responseData.length < HASH_CIRCLE_LEN
          ? responseData
          : responseData.slice(responseData.length - HASH_CIRCLE_LEN);
      }
    },
    {
      refetchOnWindowFocus: false,
      staleTime: Infinity,
    },
  );
