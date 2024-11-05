import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
	SubmenuWrapper,
	SubmenuColumn,
	ColumnCategory,
	ColumnItem,
	ItemText,
} from 'components/layout/Navbar/Navbar.styled';

type SubmenuItem = {
	icon: string;
	text: string;
	link: string;
};

export interface SubmenuProps {
	multiSubmenu: boolean;
	list: {
		category?: string;
		items: SubmenuItem[];
	}[];
}

const Submenu = ({ multiSubmenu, list }: SubmenuProps) => {
	const calculateColumns = (columns: typeof list) => {
		let columnsLength = 0;
		for (const column of columns) {
			if (column.items.length >= 2) {
				++columnsLength;
			}
		}
		return columnsLength;
	};

	return (
		<SubmenuWrapper columns={calculateColumns(list)}>
			{list.map((column, index) => (
				<SubmenuColumn key={index}>
					{multiSubmenu && <ColumnCategory>{column.category}</ColumnCategory>}
					{column.items.map((item, index) => (
						<Link href={item.link} key={index} passHref>
							<ColumnItem>
								<img
									src={`/static/icons/${item.icon}`}
									alt=""
									width={32}
									height={32}
								/>
								<ItemText>{item.text}</ItemText>
							</ColumnItem>
						</Link>
					))}
				</SubmenuColumn>
			))}
		</SubmenuWrapper>
	);
};

export default Submenu;
