import { useQuery } from 'react-query';
import { HashTagInfo } from '@src/models';
import { getApiInstance } from '@src/utils/context';

const HASH_CIRCLE_NUM = 10;

export const useGetHashTags = () =>
  useQuery(
    ['/hashtags'],
    async ({ queryKey: [url] }) => {
      if (typeof url === 'string') {
        const { data: responseData } = await getApiInstance().get<
          HashTagInfo[]
        >(url);

        if (responseData.length < HASH_CIRCLE_NUM) {
          return responseData;
        }

        const data = responseData
          .sort(() => 0.5 - Math.random())
          .slice(0, HASH_CIRCLE_NUM);

        return data;
      }
    },
    {
      refetchOnWindowFocus: false,
      staleTime: Infinity,
    },
  );
