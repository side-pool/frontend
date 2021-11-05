import React from 'react';
import Dropdown from '@src/components/Dropdown';
import { useGetCategory } from '@src/hooks/useDropdownQuery';
import styles from './SearchBar.module.scss';

interface SearchBarProps {
  options: string[];
  isActive: boolean;
}

const SearchBar = ({ options, isActive }: SearchBarProps) => {
  const { data } = useGetCategory();

  return (
    <div className={styles.SearchBar}>
      <Dropdown lists={data?.data} />
    </div>
  );
};

export default SearchBar;
