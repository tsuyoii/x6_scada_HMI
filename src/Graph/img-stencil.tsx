import { Upload } from 'antd';
import * as React from 'react';
import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface';
import FlowGraph from '.';
import { PlusOutlined } from '@ant-design/icons';

export const ImgStencil = (props: any) => {
  const [fileList, setFileList] = React.useState<UploadFile[]>([
    {
      uid: '-1',
      name: 'image.png',
      status: 'done',
      url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    },
    {
      uid: '-2',
      name: 'image.png',
      status: 'done',
      url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImnJuuZ.png',
    },
    {
      uid: '3',
      name: 'image.png',
      status: 'done',
      url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    },
    {
      uid: '4',
      name: 'image.png',
      status: 'done',
      url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    },
  ]);

  React.useEffect(() => {
    if (props.stencil) {
      const { graph } = FlowGraph;
      // 上传图片按钮的占位组件
      const uploadNode = graph.createNode({
        shape: 'ais-image',
        width: 50,
        height: 50,
        imageUrl: '',
      });
      const ImgNodes = fileList.map((item) => {
        return graph.createNode({
          shape: 'ais-image',
          width: 50,
          height: 50,
          imageUrl: item.url,
        });
      });
      props?.stencil.load([uploadNode, ...ImgNodes], 'imgGroup');
      props?.stencil.resizeGroup('imgGroup', {
        width: 220,
        height: (Array.isArray(ImgNodes) ? (ImgNodes.length + 1) * 24 : 0) + 10,
      });
      console.log(ImgNodes);
    }
  }, [fileList, props?.stencil]);

  const handleChange: UploadProps['onChange'] = async ({
    fileList: newFileList,
  }) => {
    // 单个图片上传
    // newFileList[newFileList.length - 1].url = await new Promise((resolve) => {
    //   const reader = new FileReader();
    //   reader.readAsDataURL(
    //     newFileList[newFileList.length - 1].originFileObj as RcFile
    //   );
    //   reader.onload = () => resolve(reader.result as string);
    // });

    // 多张图片批量上传
    for (let i = 0; i <= newFileList.length; i++) {
      if (newFileList[i] && !newFileList[i].url) {
        newFileList[i].url = await new Promise((resolve) => {
          const reader = new FileReader();
          reader.readAsDataURL(newFileList[i].originFileObj as RcFile);
          reader.onload = () => resolve(reader.result as string);
        });
      }
    }

    setFileList([...newFileList]);

    console.log(newFileList, 'upload');
  };

  const uploadButton = (
    <div
      style={{
        width: '50px',
        height: '50px',
        backgroundColor: '#f5f5f5',
        padding: '13px 17px',
        border: '1px dashed #7a7a7a',
        position: 'absolute',
        zIndex: 99,
        top: 85,
        left: 15,
        cursor: 'pointer',
      }}>
      <PlusOutlined />
    </div>
  );

  return (
    <>
      <Upload
        action=""
        accept=".png,.jpg,.jpeg,.gif,.svg"
        showUploadList={false}
        multiple
        // listType="picture"
        fileList={fileList}
        onChange={handleChange}>
        {uploadButton}
      </Upload>
      <div
        id="imgstencil"
        className="app-side"
        style={{ marginTop: '-21px' }}></div>
    </>
  );
};
