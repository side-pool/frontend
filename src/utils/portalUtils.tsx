import React from 'react';
import ReactDOM from 'react-dom';

const PORTAL_ID = 'portal';

export const getPortalElement = () => {
  const $portal = document.getElementById(PORTAL_ID);
  if ($portal) {
    return $portal;
  }

  const $element = document.createElement('div');
  $element.id = PORTAL_ID;
  document.body.append($element);

  return $element;
};

export const convertPortal = (children: React.ReactChild) => {
  const $portal = getPortalElement();

  return ReactDOM.createPortal(children, $portal);
};
