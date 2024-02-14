import React from 'react';

const iframeUrl = 'http://nursing-xr.s3-website.kr.object.ncloudstorage.com/';
const Nriframe = () => (
  <div style={{ height: '100vh' }}>
    <iframe
      title="EMR"
      src={iframeUrl}
      width="100%"
      height="100%"
    />
  </div>

  // <div>테스트페이지</div>

  // <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">

  // </div>
);

export default Nriframe;
