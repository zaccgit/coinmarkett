import {
	ColorType,
	createChart,
	PriceScaleMode,
	SingleValueData,
} from 'lightweight-charts';
import React, { useEffect, useRef } from 'react';
import { Container } from 'styled/elements/Container';

interface ChartProps {
	data: SingleValueData[];
	colors: {
		backgroundColor?: string;
		lineColor?: string;
		textColor?: string;
		areaTopColor?: string;
		areaBottomColor?: string;
	};
}

const Chart = ({
	data,
	colors: {
		backgroundColor = 'white',
		lineColor = '#2962FF',
		textColor = 'black',
		areaTopColor = '#2962FF',
		areaBottomColor = 'rgba(41, 98, 255, 0.28)',
	},
}: ChartProps) => {
	const chartContainerRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (!chartContainerRef.current) {
			return;
		}

		const handleResize = () => {
			chartContainerRef.current &&
				chart.applyOptions({ width: chartContainerRef.current.clientWidth });
		};

		const chart = createChart(chartContainerRef.current, {
			layout: {
				background: { type: ColorType.Solid, color: backgroundColor },
				textColor: 'gray',
			},
			width: chartContainerRef.current.clientWidth,
			height: 300,
			timeScale: {
				timeVisible: true,
				secondsVisible: false,
				borderVisible: false,
			},
			rightPriceScale: {
				borderVisible: false,
			},
			grid: {
				vertLines: {
					visible: false,
				},
			},
			localization: {
				priceFormatter: new Intl.NumberFormat('en-US', {
					notation: 'compact',
					compactDisplay: 'short',
					maximumFractionDigits: 2,
					minimumFractionDigits: 1,
				}).format,
			},
			leftPriceScale: {
				mode: PriceScaleMode.Normal,
				autoScale: true,
			},
		});
		chart.timeScale().fitContent();

		const newSeries = chart.addAreaSeries({
			lineColor,
			topColor: areaTopColor,
			bottomColor: areaBottomColor,
		});
		newSeries.setData(data);

		window.addEventListener('resize', handleResize);

		return () => {
			window.removeEventListener('resize', handleResize);

			chart.remove();
		};
	}, [
		data,
		backgroundColor,
		lineColor,
		textColor,
		areaTopColor,
		areaBottomColor,
	]);

	return (
		<Container>
			<div ref={chartContainerRef} />
		</Container>
	);
};
export default Chart;
