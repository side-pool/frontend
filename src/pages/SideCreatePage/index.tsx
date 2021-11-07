import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useLocation, useHistory } from 'react-router';
import '@toast-ui/editor/dist/toastui-editor.css';

import { Editor } from '@toast-ui/react-editor';

import styles from './SideCreatePage.module.scss';

import Button from '@src/components/common/Button';
import AlertModal from '@src/components/modals/AlertModal';

import useModalControl from '@src/hooks/useModalControl';

import {
  useGetCategory,
  useGetOrganization,
  useGetSkills,
} from '@src/hooks/useDropdownQuery';
import Dropdown, { ListsEachObject } from '@src/components/Dropdown';
import Typography from '@src/components/common/Typography';
import { setSide, useAppDispatch, useSideState } from '@src/store';
import Input, { ParentRef } from '@src/components/common/Input';
import { useMutation, useQueries, useQuery } from 'react-query';
import Textarea, { TextareaParentRef } from '@src/components/common/Textarea';
import { useCreateSide } from '@src/hooks/useSideQuery';
import axios from 'axios';

interface SidePageProps {
  handleToTop?: () => void;
}

type GithubInfoType = {
  id: string;
  homepage: string;
  html_url: string;
  owner: {
    avatar_url: string;
  };
  pushed_at: string;
  name: string;
  description: string;
  default_branch: string;
  full_name: string;
  contributors_url: string;
};

type ContributorsType = {
  id: string;
  html_url: string;
  avatar_url: string;
  login: string;
};

const SidePage = ({ handleToTop }: SidePageProps) => {
  const location = useLocation();
  const history = useHistory();

  const {
    id,
    homepage,
    html_url,
    owner: { avatar_url },
    pushed_at,
    name,
    description,
    default_branch,
    full_name,
    contributors_url,
  } = useMemo(() => location.state as GithubInfoType, [location]);

  // TODO: 더 간결한 방법 찾기..
  // const readme = useQueries([
  //   {
  //     queryKey: `https://raw.githubusercontent.com/${full_name}/${default_branch}/README.md`,
  //     queryFn: axios.get(
  //       `https://raw.githubusercontent.com/${full_name}/${default_branch}/README.md`,
  //     ),
  //   },
  //   {
  //     queryKey: `https://raw.githubusercontent.com/${full_name}/${default_branch}/readme.md`,
  //     queryFn: axios.get(
  //       `https://raw.githubusercontent.com/${full_name}/${default_branch}/readme.md`,
  //     ),
  //   },
  // ]).filter((each) => each.status === 'success')[0];

  const readme = useQuery(
    `https://raw.githubusercontent.com/${full_name}/${default_branch}/README.md`,
    axios.get(
      `https://raw.githubusercontent.com/${full_name}/${default_branch}/README.md`,
    ),
  );

  const { data: contributors } = useQuery(
    contributors_url,
    axios.get(contributors_url),
  );

  console.log(readme, 'a');

  const createSideMutation = useCreateSide();

  const descriptionRef = useRef({} as TextareaParentRef);
  // TODO: 추후 타입 정의
  const editorRef = useRef<any>();
  const serviceLinkRef = useRef({} as ParentRef);

  const dispatch = useAppDispatch();
  const { isRecruiting, category, organization, skill } = useSideState();
  const {
    isModalVisible: isAlertVisible,
    modalMessage: alertMessage,
    showModal: showAlert,
    hideModal: hideAlert,
  } = useModalControl();

  const { data: categoryData } = useGetCategory();
  const { data: organizationData } = useGetOrganization();
  const { data: skillsData } = useGetSkills();

  useEffect(() => {
    descriptionRef.current.set(description);
  }, [description]);

  useEffect(() => {
    serviceLinkRef.current.set(homepage);
  }, [homepage]);

  const handleSubmit = () => {
    if (category?.length === 0) return showAlert('Category를 선택해주세요!');
    if (organization?.length === 0)
      return showAlert('Organization을 선택해주세요!');
    if (skill?.length === 0) return showAlert('Skill을 선택해주세요!');
    if (serviceLinkRef.current.get().length === 0)
      return showAlert('Service 링크를 입력해주세요!');
    if (editorRef.current.getInstance().getMarkdown().length === 0)
      return showAlert('프로젝트의 간략한 설명을 입력해주세요!');
    if (descriptionRef.current.get().length === 0)
      return showAlert('프로젝트의 자세한 설명을 입력해주세요!');

    const params = {
      categoryNames: category,
      detail: editorRef.current.getInstance().getMarkdown(),
      githubIdentifier: id,
      githubLink: html_url,
      logoUrl: avatar_url,
      organizationIds: organization,
      period: 1,
      pushedAt: pushed_at,
      recruiting: isRecruiting,
      serviceLink: serviceLinkRef.current.get(),
      skillIds: skill,
      summary: descriptionRef.current.get(),
      title: name,
    };
    createSideMutation.mutate(params);
  };

  return (
    <div className={styles.SideCreatePage}>
      <div className={styles.sideCardContainer}>
        <div className={styles.topArea}>
          <Typography fontSize="xxl" fontWeight="bold">
            사이드
          </Typography>
        </div>

        <div className={styles.title}>
          <Typography fontSize="xxl" fontWeight="bold" lineHeight="wider">
            {name}
          </Typography>
        </div>
        <div className={styles.description}>
          <Textarea
            ref={descriptionRef}
            maxWidth
            placeholder="프로젝트에 대한 간단한 설명을 적어주세요!"
          />
        </div>
        <div className={styles.info}>
          <div>
            <div className={styles.each}>
              <Button>팀원모집</Button>
              <label className={styles.teamAvailableCheckbox}>
                <Typography fontSize="xs" lineHeight="wide" textColor="gray">
                  팀원을 모집 중 입니다.
                </Typography>
                <>
                  <input
                    type="checkbox"
                    className={styles.checkbox}
                    onChange={() =>
                      dispatch(setSide({ isRecruiting: !isRecruiting }))
                    }
                  />
                  <span className={styles.teamAvailableCheckmark} />
                </>
              </label>
            </div>
            <div className={styles.each}>
              <Button>기여자</Button>
              <div className={styles.contributors}>
                {(contributors as ContributorsType[])
                  ?.slice(0, 7)
                  .map((each: ContributorsType) => (
                    <a
                      key={each.id}
                      href={each.html_url}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <img src={each.avatar_url} alt={each.login} />
                    </a>
                  ))}
                {(contributors as ContributorsType[])?.length > 8 && (
                  <a
                    href={`${html_url}/graphs/contributors`}
                    target="_blank"
                    rel="noreferrer"
                    className={styles.more}
                  >
                    더보기
                  </a>
                )}
              </div>
            </div>
          </div>
          <div>
            <div className={styles.each}>
              <Button>분류</Button>
              <div className="dropdownGroup">
                <Dropdown
                  lists={categoryData?.data as string[]}
                  title="category"
                />
                <Dropdown
                  lists={organizationData?.data as ListsEachObject[]}
                  title="organization"
                />
                <Dropdown
                  lists={skillsData?.data as ListsEachObject[]}
                  title="skill"
                />
              </div>
            </div>
            <div className={styles.each}>
              <Button>링크</Button>
              <Input
                ref={serviceLinkRef}
                placeholder="서비스 링크를 입력해주세요"
                maxWidth
              />
            </div>
          </div>
        </div>
        <div className={styles.summary}>
          {(readme?.data as string) && (
            <Editor
              ref={editorRef}
              initialValue={readme?.data as string}
              previewStyle="vertical"
              height="660px"
              initialEditType="markdown"
            />
          )}
        </div>
        <div className={styles.buttonGroup}>
          <Button onClick={handleSubmit} primary>
            등록
          </Button>
          <Button onClick={() => history.push('side')}>취소</Button>
        </div>
      </div>
      <Button
        className={styles.scrollTopButton}
        variant="floating"
        iconName="expand_less"
        onClick={handleToTop}
      />
      {isAlertVisible && (
        <AlertModal content={alertMessage} handleConfirm={hideAlert} />
      )}
    </div>
  );
};

export default SidePage;
