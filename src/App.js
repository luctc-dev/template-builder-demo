import 'antd/dist/antd.css'
import '@luctc/template-builder/dist/index.css';
import 'codemirror/lib/codemirror.css'
import React, { useEffect, useRef, useState } from 'react';
import { Button, Drawer, Space } from 'antd';
import { ArrowDownOutlined, MobileOutlined } from '@ant-design/icons';
import { TemplateBuilder, templateBuilderToHTML, download, templateConfig } from '@luctc/template-builder';
import { StyledApp, StyledHead, StyledBuilderWrap, StyledPreviewIframe } from './App.styled';
import ErrorBoundary from './ErrorBoundary'

templateConfig.templateLocale = 'vi-VN';
    templateConfig.listVariables = [
      { key: 'email', label: 'Email' }
    ]
templateConfig.formatVariable = (key) => `{{var:${key}}}`

function App() {
  const ref = useRef({
    getData: () => {},
  });
  const [isShow, setIsShow] = useState(false);
  const [htmlTemplate, setHtmlTemplate] = useState('');
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    templateConfig.onCopilot(({ key, currentEditor }) => {
      alert(key)
    });
  }, []);

  useEffect(() => {
    templateConfig.setFileHandler((resolve, reject) => {
      // alert('Handle upload from external app');
      const inputFile = document.createElement('input');
      inputFile.type = 'file';
      inputFile.accept = 'image/png, image/gif, image/jpeg';
      inputFile.addEventListener('change', handleFileUpload);

      function handleFileUpload(event) {
        const target = event.target;
        const file = (target.files && target.files[0]) || null;

        if (file && file.type.startsWith('image/')) {
          resolve({
            url: URL.createObjectURL(file),
            context: '',
          });
        }
      }

      inputFile.click();
    });
  }, []);

  useEffect(() => {
    templateConfig.setFetchArticle(() => {
      return new Promise((resolve) => {
        setTimeout(() => {
          // resolve(null);
          resolve({
            url: 'https://example.com',
            title: 'Đau hạ sườn trái là bệnh gì? Không chỉ là vấn đề tiêu hóa',
            thumbnail: 'https://picsum.photos/300',
            description:
              'Đau hạ sườn trái là cơn đau chủ yếu ở góc nửa phía dưới bên trái của bụng. Khu vực vùng bụng bên trái có thể mềm khi chạm vào kèm theo cơn đau dữ dội và khiến toàn bộ vùng bụng bị căng cứng. Nguyên nhân gây đau chủ yếu liên quan đến đường tiêu hóa, nhưng cũng có thể liên quan đến các cơ quan khác, chẳng hạn như da, mạch máu, đường tiết niệu hoặc cơ quan sinh sản ở phụ nữ và nam giới.',
            authorName: 'Trúc Phạm',
            authorAvatar: 'https://picsum.photos/150/150',
          });
        }, 500);
      });
    });
  }, []);

  useEffect(() => {
    templateConfig.setFetchProduct(() => {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            url: 'https://example.com',
            title: "Viên Uống Mọc Tóc Puritan's Pride Biotin 10000 mcg - 100 viên",
            thumbnail: 'https://picsum.photos/400',
            priceFinal: 505000,
            priceRegular: 600000,
            discountPercent: 16,
            buttonText: 'Mua Ngay',
          });
        }, 500);
      });
    });
  }, []);
  
  return (
    <StyledApp>
      <StyledHead>
        <Button
          type="primary"
          onClick={() => {
            const builderData = ref.current.getData();
            const srcDoc = templateBuilderToHTML(builderData);
            setHtmlTemplate(srcDoc);
            setIsShow(true);
          }}
        >
          Preview
        </Button>
      </StyledHead>
      <StyledBuilderWrap>
        <ErrorBoundary>
          <TemplateBuilder localStorageKey="builderData" ref={ref} templateType="email" />
        </ErrorBoundary>
      </StyledBuilderWrap>
      <Drawer
        title="Preview" //
        placement="right"
        width="80vw"
        onClose={() => setIsShow(false)}
        visible={isShow}
        extra={
          <Space>
            <Button
              type={isMobile ? 'primary' : undefined} //
              icon={<MobileOutlined />}
              onClick={() => setIsMobile(!isMobile)}
            >
              Mobile
            </Button>
            <Button
              onClick={() => {
                download(`EmailTemplate_untitled_${Date.now()}.html`, htmlTemplate);
              }}
              icon={<ArrowDownOutlined />}
            ></Button>
          </Space>
        }
      >
        {isShow && htmlTemplate && (
          <StyledPreviewIframe className={isMobile ? 'mobile-view' : ''}>
            {isMobile && <MobileBackground />}
            <iframe
              title="Preview" //
              style={{
                width: isMobile ? '320px' : '100%', //
                height: isMobile ? '480px' : 'calc(100vh - 120px)',
              }}
              frameBorder="0"
              srcDoc={htmlTemplate.replace(
                '<style>',
                `<style>
                  body {
                    overflow: overlay;
                  }
                  body::-webkit-scrollbar {
                    width: 6px;
                  }
                  
                  body::-webkit-scrollbar-track {
                    background-color: transparent;
                  }
                  
                  body::-webkit-scrollbar-thumb {
                    border-radius: 6px;
                    background-color: rgba(0, 0, 0, 0.4);
                  }`,
              )}
            />
          </StyledPreviewIframe>
        )}
      </Drawer>
    </StyledApp>
  );
}

function MobileBackground() {
  return (
    <svg width="342px" height="612px" viewBox="0 0 342 612">
      <defs />
      <g id="Page-1" stroke="none" strokeWidth={1} fill="none" fillRule="evenodd">
        <g id="Artboard-1" transform="translate(-469.000000, -144.000000)">
          <g id="Rectangle-22-+-Oval-4-+-Rectangle-23-+-Oval-5" transform="translate(470.000000, 145.000000)">
            <rect id="Rectangle-22" stroke="#979797" fill="#FFFFFF" x={0} y={0} width={340} height={610} rx={33} />
            <circle id="Oval-4" stroke="#C4C4C4" fill="#FBFBFB" cx={170} cy={577} r={25} />
            <g id="Rectangle-23-+-Oval-5" transform="translate(126.000000, 27.000000)">
              <circle id="Oval-5" stroke="#C4C4C4" fill="#FBFBFB" cx="4.5" cy="4.5" r="4.5" />
              <path
                d="M23.5032382,0 L64.4967618,0 C66.9838316,0 69,2.01977567 69,4.5 C69,6.98528137 66.9780138,9 64.4967618,9 L23.5032382,9 C21.0161684,9 19,6.98022433 19,4.5 C19,2.01471863 21.0219862,0 23.5032382,0 Z M23.5032382,2 L64.4967618,2 C65.8774903,2 67,3.12257327 67,4.5 C67,5.87798373 65.8761743,7 64.4967618,7 L23.5032382,7 C22.1225097,7 21,5.87742673 21,4.5 C21,3.12201627 22.1238257,2 23.5032382,2 Z"
                id="Rectangle-23"
                fill="#C4C4C4"
              />
              <path
                d="M22.6120746,1 L65.3879254,1 C66.8286855,1 68,2.57160257 68,4.5 C68,6.42917723 66.8273124,8 65.3879254,8 L22.6120746,8 C21.1713145,8 20,6.42839743 20,4.5 C20,2.57082277 21.1726876,1 22.6120746,1 Z"
                id="Path"
                fill="#FBFBFB"
              />
            </g>
          </g>
        </g>
      </g>
    </svg>
  );
}

export default App;
