import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

interface CoinsGlobal {
	active_cryptocurrencies: number;
	markets: number;
	total_market_cap: {
		[key: string]: number;
	};
	total_volume: {
		[key: string]: number;
	};
	market_cap_percentage: {
		[key: string]: number;
	};
	market_cap_change_percentage_24h_usd: number;
}

const fetchGlobalStatistics = () =>
	axios.get<{ data: CoinsGlobal }>(`${process.env.NEXT_PUBLIC_API_URL}/global`);

const useGlobalStatistics = () => {
	return useQuery({
		queryKey: ['global'],
		queryFn: async () => (await fetchGlobalStatistics()).data.data,
	});
};

export default useGlobalStatistics;
