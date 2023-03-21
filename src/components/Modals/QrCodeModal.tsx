import QRCode from "react-qr-code";
import React, { useState, useEffect } from "react";
import ReactDom from "react-dom";
import { IoMdClose } from "react-icons/io";
import confetti from "canvas-confetti";
import QRCodeLink from "qrcode";
import { HiDownload } from "react-icons/hi";
import { AiOutlineCopy, AiOutlineCheck } from "react-icons/ai";

interface QrCodeModalProps {
  link: string;
  visible: boolean;
  onClose(): void;
}

function QrCodeModal({ visible, onClose, link }: QrCodeModalProps) {
  const [qrCodeLinkDownload, setQrCodeLinkDownload] = useState("");

  const [isCopied, setIsCopied] = useState<boolean>(false);

  useEffect(() => {
    handleGenerateDownload();
  }, []);

  let container;
  if (!visible) {
    return null;
  }

  confetti({
    particleCount: 150,
  });

  async function handleGenerateDownload() {
    QRCodeLink.toDataURL(
      link,
      {
        width: 600,
        margin: 3,
      },
      (err, url) => {
        setQrCodeLinkDownload(url);
      }
    );
  }

  function copyLinkToClipboard() {
    navigator.clipboard.writeText(link);
    setIsCopied(true);
  }

  const rootContainer = document.createElement("div");
  const parentElem = document.querySelector("#__next");
  parentElem?.appendChild(rootContainer);
  container = rootContainer;

  return (
    container &&
    ReactDom.createPortal(
      <div className="my-blur fixed z-50 flex px-4 justify-center items-center left-0 top-0 bg-[#000000cc] py-8 w-full h-full">
        <div className="bg-white w-full md:w-[800px] max-h-[600px] rounded-lg p-8 overflow-y-scroll apperModal hidden-scroll">
          <header className="flex justify-between pb-8">
            <span className="font-bold text-blue-500 text-lg">
              Congratulations, your page has been created!
            </span>
            <button
              className="close-icon"
              type="button"
              onClick={() => {
                onClose();
                setIsCopied(false);
              }}
            >
              <IoMdClose color="#6e6e6e" size={24} />
            </button>
          </header>
          <section className="flex flex-col items-center justify-center gap-5">
            <QRCode value={link} />
            <div className="flex gap-4">
              <a
                href={qrCodeLinkDownload}
                download={`qrcodegenerator.png`}
                className="flex items-center gap-2 text-blue-500 hover:underline"
              >
                <HiDownload />
                <span>Downlaod QRCODE</span>
              </a>
              <button
                disabled={isCopied}
                onClick={copyLinkToClipboard}
                className={`flex items-center gap-2 ${
                  !isCopied
                    ? "text-gray-700  hover:underline"
                    : "text-green-700 cursor-default"
                }`}
              >
                {!isCopied ? <AiOutlineCopy /> : <AiOutlineCheck />}
                <span>{!isCopied ? "Copy link" : "Copied"}</span>
              </button>
            </div>
          </section>
        </div>
      </div>,
      container
    )
  );
}

export default QrCodeModal;
