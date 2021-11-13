import React, { useEffect, useMemo, useRef } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { useQueryClient } from 'react-query';
import { Editor } from '@toast-ui/react-editor';

import '@toast-ui/editor/dist/toastui-editor.css';

import styles from './SideCreatePage.module.scss';

import Button from '@src/components/common/Button';
import AlertModal from '@src/components/modals/AlertModal';
import Dropdown, { ListsEachObject } from '@src/components/Dropdown';
import Typography from '@src/components/common/Typography';
import Input, { ParentRef } from '@src/components/common/Input';
import Textarea, { TextareaParentRef } from '@src/components/common/Textarea';

import useModalControl from '@src/hooks/useModalControl';

import {
  useGetCategory,
  useGetOrganization,
  useGetSkills,
} from '@src/hooks/useDropdownQuery';
import { useCreateSide } from '@src/hooks/useSideQuery';
import {
  ContributorsType,
  GithubInfoType,
  useReadContributors,
  useReadReadme,
} from '@src/hooks/useGithubQuery';

import { setInitSide, setSide, useAppDispatch, useSideState } from '@src/store';

interface SideCreatePageProps {
  handleToTop?: () => void;
}

const SideCreatePage = ({ handleToTop }: SideCreatePageProps) => {
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
  const readme = useReadReadme(full_name, default_branch);

  const { data: contributors } = useReadContributors(contributors_url);

  const createSideMutation = useCreateSide();

  const titleRef = useRef({} as ParentRef);
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
    titleRef.current.set(name);
  }, [name]);

  useEffect(() => {
    descriptionRef.current.set(description);
  }, [description]);

  useEffect(() => {
    serviceLinkRef.current.set(homepage);
  }, [homepage]);

  const queryClient = useQueryClient();

  const handleSubmit = () => {
    if (titleRef.current.get().length === 0 || titleRef === undefined)
      return showAlert('제목을 입력해주세요!');
    if (category?.length === 0 || category === undefined)
      return showAlert('Category를 선택해주세요!');
    if (organization?.length === 0 || organization === undefined)
      return showAlert('Organization을 선택해주세요!');
    if (skill?.length === 0 || skill === undefined)
      return showAlert('Skill을 선택해주세요!');
    if (
      editorRef.current.getInstance().getMarkdown().length === 0 ||
      editorRef === undefined
    )
      return showAlert('프로젝트의 자세한 설명을 입력해주세요!');
    if (
      descriptionRef.current.get().length === 0 ||
      descriptionRef === undefined
    )
      return showAlert('프로젝트의 간략한 설명을 입력해주세요!');
    if (isRecruiting === undefined)
      return showAlert('알 수 없는 에러가 발생했습니다.');

    // TODO: 추후 정규식 or 실제 get 요청 날리는 식으로 리팩토링
    const serviceLink = serviceLinkRef.current.get();
    if (serviceLink.length > 0 && !serviceLink.includes('http'))
      return showAlert('올바릉 형식의 서비스 링크를 입력해주세요!');

    const params = {
      categoryNames: category,
      detail: editorRef.current.getInstance().getMarkdown(),
      githubIdentifier: Number(id),
      githubLink: html_url,
      logoUrl: avatar_url,
      organizationIds: organization?.map((each) => Number(each)),
      pushedAt: pushed_at,
      recruiting: isRecruiting,
      serviceLink,
      skillIds: skill?.map((each) => Number(each)),
      summary: descriptionRef.current.get(),
      title: titleRef.current.get(),
    };

    createSideMutation.mutate(params, {
      onSuccess: async () => {
        await dispatch(setInitSide());
        queryClient.removeQueries('/sides');

        history.push('/side');
      },
      // TODO: 추후 타입 정의
      onError: (e: any) => {
        if (e.response.status === 400) {
          showAlert('입력하신 리포지토리로는 toy가 이미 생성되어있습니다');
        }
      },
    });
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
          <Input ref={titleRef} />
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
                {(contributors as unknown as ContributorsType[])
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
                {(contributors as unknown as ContributorsType[])?.length >
                  8 && (
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
          {(readme?.data as string) ? (
            <Editor
              ref={editorRef}
              initialValue={readme?.data as string}
              previewStyle="vertical"
              height="660px"
              initialEditType="markdown"
            />
          ) : (
            <Editor
              ref={editorRef}
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

export default SideCreatePage;
