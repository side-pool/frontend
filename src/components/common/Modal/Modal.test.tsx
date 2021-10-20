// import React from 'react';
// import { render, getByTestId } from '@src/utils/test-utils';

// import Modal, { ModalProps, Portal } from '@src/components/common/Modal';

// function renderModal(props: ModalProps) {
//   return render(
//     <>
//       <div id="portal" />
//       <Portal>
//         <Modal {...props} />
//       </Portal>
//     </>,
//   );
// }

// describe('<Modal />', () => {
//   // TODO: Portal 컴포넌트 portalElement 가 없는 경우의 테스트
//   // TODO: handleCloseModal 분기에 대한 테스트
//   it('컴포넌트는 정상적으로 렌더링되어야 한다.', () => {
//     const { container } = renderModal({});
//     expect(container).toBeInTheDocument();
//   });

//   context('props를 넘기는 상황에서', () => {
//     it('fadeout props를 넘기면 컴포넌트에 반영된다', () => {
//       const { container } = renderModal({ fadeout: true });

//       expect(getByTestId(container, 'modal')).toHaveClass('fadeout');
//     });
//     it('headerText props를 넘기면 컴포넌트에 반영된다', () => {
//       const { container } = renderModal({ headerText: 'something' });

//       expect(
//         getByTestId(container, 'modal').childNodes[0].childNodes[0],
//       ).toHaveClass('modalHeader');
//     });
//     it('footer props를 넘기면 컴포넌트에 반영된다', () => {
//       const { container } = renderModal({
//         footer: { cancelButton: <></>, submitButton: <></> },
//       });

//       expect(
//         getByTestId(container, 'modal').childNodes[0].childNodes[1],
//       ).toHaveClass('footer');
//     });
//   });
// });
