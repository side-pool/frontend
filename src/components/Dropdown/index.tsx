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
import ArrowDown from '@src/assets/ArrowDown.svg';
import Typography from '../common/Typography';
import { setSide, useAppDispatch, useSideState } from '@src/store';
import { SideParams } from '@src/models';

export type ListsEachObject = {
  name: string;
  id: number;
};

export interface DropdownProps {
  lists: ListsEachObject[] | string[];
  title: keyof Pick<SideParams, 'category' | 'organization' | 'skill'>;
}

// TODO: number, string 문제 해결하기, DropdownLists
export interface DropdownEach {
  name: string;
  id: number | string;
  checked: boolean;
}

// TODO 제네릭으로 해결
// category, skill, organization 하나씩
// title 은 확인용
const Dropdown = ({ lists = [], title }: DropdownProps) => {
  const dispatch = useAppDispatch();
  const side = useSideState();
  const [open, setOpen] = useState(false);
  const [dropdwonLists, setDropdownLists] = useState<DropdownEach[]>([]);

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
      setDropdownLists(() =>
        // TODO: 타입 추후 정의
        (lists as any)?.reduce(
          (acc: Partial<DropdownEach>[], cur: ListsEachObject | string) => {
            if (title === 'skill' || title === 'organization') {
              // skill, organization 확인
              const { name, id: curId } = cur as ListsEachObject;

              const curSideList = side[title] as number[];

              return [
                ...acc,
                {
                  name: name,
                  id: curId,
                  checked: curSideList.includes(curId),
                },
              ];
            }

            // category
            const curSideList = side[title] as string[];

            return [
              ...acc,
              {
                name: cur,
                id: cur,
                checked: curSideList.includes(cur as string),
              },
            ];
          },
          [],
        ),
      ),
    [side],
  );

  const handleCheckSelected = (e: ChangeEvent<HTMLInputElement>) => {
    setDropdownLists((prev) =>
      prev.map((each: DropdownEach) => {
        const curSideList = (side[title] as any[]) || [];

        // category, skill은 numeric
        const id = e.target.id;
        const curId = String(each.id);

        if (curId === id) {
          if (each.checked) {
            dispatch(
              setSide({
                [title]: curSideList.filter((each) => String(each) !== id),
              }),
            );
          } else {
            if (title === 'category') {
              dispatch(setSide({ [title]: [...curSideList, id] }));
            } else {
              dispatch(setSide({ [title]: [...curSideList, Number(id)] }));
            }
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
        <ArrowDown className={styles.arrowDown} />
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
