import React, {
  useState,
  useEffect,
  useMemo,
  useRef,
  ChangeEvent,
} from 'react';
import cn from 'classnames';
import styles from './Dropdown.module.scss';
import DropdownLists from '@src/components/Dropdown/DropdownLists';
import Icon from '@src/components/common/Icon';
import Typography from '../common/Typography';
import { setSide, useAppDispatch, useSideState } from '@src/store';
import { SideParams } from '@src/models';

export type ListsEachObject = {
  name: string;
  id: string;
};

export interface DropdownProps {
  lists: ListsEachObject[] | string[];
  title: keyof Pick<SideParams, 'category' | 'organization' | 'skill'>;
}

export interface DropdownEach {
  name: string;
  id: string;
  checked: boolean;
}

const Dropdown = ({ lists = [], title }: DropdownProps) => {
  const dispatch = useAppDispatch();
  const side = useSideState();
  const [open, setOpen] = useState(false);
  const [dropdwonLists, setDropdwonLists] = useState<DropdownEach[]>([]);

  const wrapperRef = useRef<HTMLInputElement>(null);
  const isChecked = useMemo(
    () => dropdwonLists?.some(({ checked }) => checked),
    [dropdwonLists],
  );

  useEffect(() => {
    document.addEventListener('click', handleClickOutside, true);
    return () =>
      document.removeEventListener('click', handleClickOutside, true);
  }, []);

  const handleClickOutside = ({ target }: MouseEvent) => {
    if (!wrapperRef.current?.contains(target as HTMLDivElement)) {
      setOpen(false);
    }
  };

  useEffect(
    () =>
      setDropdwonLists(() =>
        // TODO: 타입 추후 정의
        (lists as any)?.reduce(
          (acc: Partial<DropdownEach>[], cur: ListsEachObject | string) => {
            if (cur.hasOwnProperty('id')) {
              const { name, id } = cur as ListsEachObject;

              return [
                ...acc,
                {
                  name: name,
                  id: id,
                  checked: false,
                },
              ];
            }

            return [
              ...acc,
              {
                name: cur,
                id: cur,
                checked: false,
              },
            ];
          },
          [],
        ),
      ),
    [lists],
  );

  const handleCheckSelected = (e: ChangeEvent<HTMLInputElement>) => {
    setDropdwonLists((prev) =>
      prev.map((each: DropdownEach) => {
        const datas = side[title] || [];
        const id = e.target.id.toString();
        if (each.id == id) {
          if (each.checked) {
            dispatch(setSide({ [title]: datas.filter((each) => each !== id) }));
          } else {
            dispatch(setSide({ [title]: [...datas, id] }));
          }

          return {
            ...each,
            checked: !each.checked,
          };
        }
        return each;
      }),
    );
  };

  return (
    <div className={styles.Dropdown} ref={wrapperRef}>
      <div
        className={cn(styles.DropdownButton, open ? styles.open : styles.close)}
        onClick={() => setOpen(!open)}
        aria-hidden="true"
      >
        <Typography
          fontSize="xs"
          lineHeight="wider"
          textColor={isChecked ? 'blueActive' : 'gray'}
        >
          {isChecked
            ? dropdwonLists
                ?.reduce<string[]>((acc, cur) => {
                  if (cur.checked) {
                    return [...acc, cur.name];
                  }
                  return [...acc];
                }, [])
                .join(', ')
            : title}
        </Typography>
        <Icon iconName="arrow_drop_down" color="#C4C4C4" pointer />
      </div>
      {open && (
        <DropdownLists
          dropdwonLists={dropdwonLists}
          onChange={handleCheckSelected}
        />
      )}
    </div>
  );
};

export default Dropdown;
