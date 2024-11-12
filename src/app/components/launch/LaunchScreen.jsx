
/* eslint-disable @next/next/no-img-element */
"use client";
//TODO: FIX FORM FIELDS DISPLAY AND CLEAR AFTER TX CONFIRM
import { useSearchParams } from 'next/navigation';
import { Suspense, useEffect, useState, useRef } from 'react';
import gsap from 'gsap';
import Image from 'next/image';
import Cropper from 'react-easy-crop';
import LeftBGImg from './LeftBGImg';
import RightBGImg from './RightBGImg';
import LaunchInput from './LaunchInput';
import LaunchTextArea from './LaunchTextArea';
import { Montserrat } from 'next/font/google';
import { CustomEase } from 'gsap/all';
import {
  mainnet,
  polygon,
  optimism,
  arbitrum,
  base,
  holesky,
} from 'wagmi/chains';
import { config } from '@/app/layout';

import { useWriteContract, useAccount } from 'wagmi';
import { waitForTransactionReceipt } from '@wagmi/core'

import { stringToHex } from 'viem';

import { FaGlobe, FaTelegramPlane, FaTwitter, FaImage } from "react-icons/fa";



// ABI of the Factory Contract
const factoryABI = [
  {
    "constant": false,
    "inputs": [
      { "name": "name_", "type": "bytes" },
      { "name": "symbol_", "type": "bytes" },
      { "name": "tokenURI_", "type": "bytes" }
    ],
    "name": "launchToken",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  }
];

const factoryAddress = "0xE3943ef5c13Ad06B2Fc0A94D7444F257c0316795";

const mont = Montserrat({ subsets: ['cyrillic'] });
gsap.registerPlugin(CustomEase);

const initialFormState = {
  name: "",
  symbol: "",
  description: "",
  website: "",
  telegram: "",
  twitter: "",
  initialBuy: ""
};


const LaunchScreen = () => {
  const { address, isConnected } = useAccount();

  const searchParams = useSearchParams();
  const [formValue, setFormValue] = useState(initialFormState);
  const [formKey, setFormKey] = useState(0);

  const resetForm = () => {
    setFormValue(initialFormState);  // Reset form values
    setProfileImage('/profile.png'); // Reset profile image
    setUploadedImage(null);          // Reset any uploaded image
    if (fileInputRef.current) fileInputRef.current.value = ""; // Clear file input
  };



  const [modal, setModal] = useState({
    isVisible: false,
    title: "",
    message: "",
    isClosable: true, // Flag to make modal closable or not
    ipfsData: null, // For fetched IPFS JSON data
  });

  const [contractArgs, setContractArgs] = useState({
    name: '',
    symbol: '',
    tokenURI: ''
  });

  const [profileImage, setProfileImage] = useState('/profile.png');
  const fileInputRef = useRef(null);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [showCropper, setShowCropper] = useState(false);
  const [deployedAddress, setDeployedAddress] = useState();

  const [loading, setLoading] = useState(false); // Add loading state


  const { data: txHash, isPending, isError, error, onSuccess, status: TXstatus, writeContract } = useWriteContract();

  useEffect(() => {
    const fetchTransactionDetails = async () => {
      if (txHash) {
        try {
          // Show non-closable loading modal while awaiting confirmation
          showModal("Transaction Sent", "Waiting for on-chain confirmation...", false);

          // Await transaction receipt
          const transaction = await waitForTransactionReceipt(config, {
            confirmations: 1,
            chain: holesky,
            hash: txHash,
          });

          const deployedTokenAddress = transaction?.logs[0]?.address || 'N/A';
          setDeployedAddress(deployedTokenAddress);

          // Fetch the IPFS JSON data
          const ipfsData = await fetchIPFSData(contractArgs.tokenURI);

          // Update modal with success message, contract args, and fetched IPFS data
          showModal(
            "Success!",
            `Your token has been deployed!\n\nToken Address: ${deployedTokenAddress}`,
            true, // Allow modal to be closable now
            ipfsData
          );

          // Notify the backend after successful confirmation
          await fetch('/api/notify', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ txHash }),
          });

          // Clear form after successful transaction
          resetForm();

        } catch (error) {
          console.error("Error fetching transaction details:", error);
          showModal("Transaction Failed", error.message, true);
        }
      }
    };

    if (txHash) {
      fetchTransactionDetails();
    }
  }, [txHash]);

  const fetchIPFSData = async (ipfsUri) => {
    const ipfsUrl = `https://ipfs.io/ipfs/${ipfsUri.split('ipfs://')[1]}`;
    try {
      const response = await fetch(ipfsUrl);
      const data = await response.json();

      return data;
    } catch (error) {
      console.error("Error fetching IPFS data:", error);
      return null;
    }
  };

  const changeFormValue = (name, value) => {
    const key =
      name === 'TOKEN NAME' ? 'name' :
        name === 'TOKEN SYMBOL' ? 'symbol' :
          name === 'TOKEN DESCRIPTION' ? 'description' :
            name === 'WEBSITE' ? 'website' :
              name === 'TELEGRAM' ? 'telegram' :
                name === 'TWITTER' ? 'twitter' :
                  'initialBuy';
    setFormValue((prev) => ({ ...prev, [key]: value }));
  };

  const DebounceChange = (key, value) => {
    changeFormValue(key, value);
  };

  const springAni = (e) => {
    gsap.to(e.target, { scale: 0.6, duration: 0.1 });
    gsap.to(e.target, { scale: 1, duration: 0.5, delay: 0.1, ease: CustomEase.create("custom", "M0,0 C0.129,0.352 0.131,0.32 0.19,0.533 0.226,0.664 0.305,1.349 0.378,1.396 0.417,1.421 0.534,0.9 0.6,0.9 0.647,0.9 0.701,1.167 0.76,1.172 0.8,1.174 0.862,0.937 0.903,0.937 0.943,0.936 1,1 1,1 ") });
  };

  const handlePencilClick = () => {
    fileInputRef.current.click();
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      const image = document.createElement('img');

      reader.onload = (event) => {
        image.src = event.target.result;

        image.onload = () => {
          if (image.width !== image.height) {
            setUploadedImage(event.target.result);
            setShowCropper(true);
            return;
          }

          setProfileImage(event.target.result);
          setUploadedImage(file);
        };
      };

      reader.readAsDataURL(file);
    }
  };

  const onCropComplete = (croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  };

  const cropImage = async () => {
    if (!uploadedImage || !croppedAreaPixels) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const nonCroppedImage = event.target.result;
        setProfileImage(nonCroppedImage);
      };
      reader.readAsDataURL(uploadedImage);
      setShowCropper(false);
      return;
    }

    const image = document.createElement('img');
    image.src = uploadedImage;
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    canvas.width = croppedAreaPixels.width;
    canvas.height = croppedAreaPixels.height;

    image.onload = () => {
      ctx.drawImage(
        image,
        croppedAreaPixels.x,
        croppedAreaPixels.y,
        croppedAreaPixels.width,
        croppedAreaPixels.height,
        0,
        0,
        croppedAreaPixels.width,
        croppedAreaPixels.height
      );

      const croppedImage = canvas.toDataURL('image/jpeg');
      setProfileImage(croppedImage);
      setShowCropper(false);
    };
  };

  const showModal = (title, message, isClosable = true, ipfsData = null) => {
    setModal({ isVisible: true, title, message, isClosable, ipfsData });
  };

  const closeModal = () => {
    setModal({ isVisible: false, title: "", message: "", ipfsData: null });
  };

  const validateForm = () => {
    const { name, symbol, description, website, telegram, twitter, initialBuy } = formValue;

    if (!name) {
      showModal("Validation Error", "Please fill in the TOKEN NAME.", true);
      return false;
    }

    if (!symbol) {
      showModal("Validation Error", "Please fill in the TOKEN SYMBOL.", true);
      return false;
    }

    if (!description) {
      showModal("Validation Error", "Please fill in the TOKEN DESCRIPTION.", true);
      return false;
    }

    if (profileImage === '/profile.png' || !uploadedImage) {
      showModal("Validation Error", "Please upload a profile image.", true);
      return false;
    }

    return true;
  };


  const deployTokenAndPool = async () => {
    if (!validateForm()) {
      return;
    }

    try {
      const formData = new FormData();

      formData.append('image', profileImage); // profileImage now contains the base64 data URL
      formData.append('name', formValue.name);
      formData.append('symbol', formValue.symbol);
      formData.append('description', formValue.description);
      formData.append('website', formValue.website);
      formData.append('telegram', formValue.telegram);
      formData.append('twitter', formValue.twitter);
      formData.append('initialBuy', formValue.initialBuy);
      formData.append('creator', address);
      setLoading(true); // Stop loading after the upload is complete

      const response = await fetch('/api/uploadMetadata', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        setLoading(false); // Stop loading after the upload is complete

        console.log('Metadata successfully uploaded to IPFS:', data.metadataIpfsUrl);

        LaunchTokenAndPool(formValue.name, formValue.symbol, data.metadataIpfsUri);
      } else {
        alert(`Error: ${data.error}`);
      }
    } catch (error) {
      console.log('Error uploading metadata:', error);
      alert('An error occurred while uploading metadata.');
    }
  };


  const LaunchTokenAndPool = async (name, symbol, uri) => {
    try {

      setContractArgs({
        name: name,
        symbol: symbol,
        tokenURI: uri
      });

      const preparedName = stringToHex(name);
      const preparedSymbol = stringToHex(symbol);
      const preparedTokenURI = stringToHex(uri);

      writeContract(
        {
          address: factoryAddress,
          abi: factoryABI,
          functionName: 'launchToken',
          args: [preparedName, preparedSymbol, preparedTokenURI],
        }
      );

    } catch (error) {
      console.error("Error during contract interaction:", error);
    }
  };

  useEffect(() => {
    if (searchParams.get('launch') === 'true') {
      gsap.set('#LaunchScreen', { pointerEvents: 'all', display: 'flex' });
      gsap.to('#LaunchScreen', { opacity: 1 });
      gsap.to('#HomeScreen', { opacity: 0 });
      gsap.set('#HomeScreen', { pointerEvents: 'none', delay: 0.3, display: 'none' });
    } else {
      gsap.set('#HomeScreen', { pointerEvents: 'all', display: 'block' });
      gsap.to('#HomeScreen', { opacity: 1 });
      gsap.to('#LaunchScreen', { opacity: 0 });
      gsap.set('#LaunchScreen', { pointerEvents: 'none', delay: 0.2, display: 'none' });
    }
  }, [searchParams]);


  const Modal = ({ isVisible, title, message, isClosable, ipfsData }) => {
    if (!isVisible) return null;

    // Extract needed fields from ipfsData for cleaner display
    const { name, description, image, website, telegram, twitter } = ipfsData || {};

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
        <div
          className={`bg-[#111111] p-6 rounded-lg shadow-lg ${title === "Success!" ? "w-[50rem]" : "w-96"}`}
        >
          <h2 className="text-lg font-bold text-white">{title}</h2>
          <p className="text-white mt-4 whitespace-pre-wrap">{message}</p>

          {/* Only display token and IPFS data if the title indicates success */}
          {title === "Success!" && (
            <>
              <div className="mt-4 text-white">
                <h3 className="font-bold text-xl mb-2">Token Information</h3>

                {/* Name */}
                <p className="mb-2">
                  <strong className="text-blue-400">Name:</strong> {name}
                </p>

                {/* Description */}
                <p className="mb-2">
                  <strong className="text-blue-400">Description:</strong> {description || "No description available"}
                </p>

                {/* Image - Thumbnail Preview */}
                {image && (
                  <div className="mb-4">
                    <strong className="text-blue-400">Image:</strong>
                    <a
                      href={`https://ipfs.io/ipfs/${image.split('ipfs://')[1]}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block mt-2"
                    >
                      <img
                        src={`https://ipfs.io/ipfs/${image.split('ipfs://')[1]}`}
                        alt={name}
                        className="w-24 h-24 object-cover rounded-lg"
                      />
                    </a>
                  </div>
                )}

                {/* Website */}
                {website && (
                  <p className="mb-2 flex items-center">
                    <FaGlobe className="text-blue-400 mr-2" />
                    <a href={website} target="_blank" rel="noopener noreferrer" className="text-blue-400 underline">
                      {website}
                    </a>
                  </p>
                )}

                {/* Telegram */}
                {telegram && (
                  <p className="mb-2 flex items-center">
                    <FaTelegramPlane className="text-blue-400 mr-2" />
                    {telegram}
                  </p>
                )}

                {/* Twitter */}
                {twitter && (
                  <p className="mb-2 flex items-center">
                    <FaTwitter className="text-blue-400 mr-2" />
                    {twitter}
                  </p>
                )}
              </div>
            </>
          )}

          <div className="mt-6 flex justify-end space-x-4">
            {isClosable && (
              <>
                {/* Close Button */}
                <button
                  onClick={() => closeModal()}
                  className="font-cheese py-2 px-6 text-xl rounded-xl text-white bg-gradient-to-r from-[#FF4672] to-[#B972FF]"
                >
                  Close
                </button>

                {/* Go to Token Button */}
                {title === "Success!" && (
                  <a
                    href={`/token/${deployedAddress}`}
                    className="font-cheese py-2 px-6 text-xl rounded-xl text-white bg-gradient-to-r from-[#4EA5FF] to-[#B972FF]"
                  >
                    Go to Token
                  </a>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    );
  };


  return (
    <div id="LaunchScreen" className="absolute z-10 md:pt-20 pt-16 md:pl-16 pl-4 md:pr-0 pr-4 top-0 left-0 hidden pointer-events-none opacity-0 w-full h-dvh">
      <LeftBGImg />
      <RightBGImg />
      {showCropper && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-80 z-50">
          <div className="relative w-2/3 h-2/3 bg-[#111111] text-white rounded-lg shadow-lg overflow-hidden p-4">
            <p className="text-center text-white mb-4">
              Please crop the image to a square aspect ratio. This ensures the profile picture displays correctly.
            </p>
            <div className="relative w-full h-full">
              <Cropper
                image={uploadedImage}
                crop={crop}
                zoom={zoom}
                aspect={1}
                onCropChange={setCrop}
                onZoomChange={setZoom}
                onCropComplete={onCropComplete}
                style={{
                  containerStyle: { width: '100%', height: '100%', position: 'relative' },
                  cropAreaStyle: { border: '2px solid #5E6EFF', borderRadius: '8px' },
                }}
              />
              <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-4 p-4">
                <button onClick={cropImage} className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-md shadow-md hover:shadow-lg transition-shadow">
                  Crop Image
                </button>
                <button onClick={() => setShowCropper(false)} className="px-4 py-2 bg-gray-500 text-white rounded-md shadow-md hover:shadow-lg transition-shadow">
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="flex relative z-10 p-4 sm570:pt-4 pt-3 w-full h-full gap-4 md:flex-row flex-col justify-between items-center">
        <div className="md:w-2/5 w-full md:h-full h-[47%] flex lg890md:pl-10 md:pl-4 justify-start items-center">
          <div className="rounded-3xl overflow-hidden relative xl1120lg:w-4/5 md:w-11/12 w-full md:h-3/4 h-full bg-blackPry">
            <div className="flex justify-center items-center sm570:gap-4 gap-2 md:flex-col sm570:flex-row flex-col w-full h-full lg:p-8 md:p-4 sm570:p-8 p-2 relative z-10">
              <div className="md:w-1/2 sm570:w-auto w-[20%] md:h-auto sm570:h-[90%] h-auto aspect-square rounded-full p-1 flex justify-center items-center relative bg-gradient-to-bl from-[#5E6EFF] to-[#B910BC]">
                <Image src={profileImage} alt="profile" width={100} height={100} className="w-full h-full object-contain object-center" />
                <button onClick={handlePencilClick} className="absolute sm570:bottom-0 -bottom-1 sm570:right-0 -right-1 flex justify-center items-center sm570:p-2 p-1 sm570:rounded-2xl rounded-md border-4 border-blackPry bg-gradient-to-b from-bluePry to-[#5E6EFF]">
                  <Image src={'/pencil.png'} alt="edit" width={40} height={40} className="xl:size-7 sm570:size-5 size-2" />
                </button>
                <input
                  type="file"
                  accept="image/*"
                  ref={fileInputRef}
                  style={{ display: 'none' }}
                  onChange={handleImageChange}
                />
              </div>
              <div className='w-full flex md:flex-col sm570:flex-row flex-col justify-center items-center sm570:gap-4 gap-0 sm570:px-0 px-4'>
                <LaunchInput DebounceChange={DebounceChange} bgClr={'#1B1C1E'} font={'beat'} name={'TOKEN NAME'} required={true} type={'text'} value={formValue.name} />
                <LaunchInput DebounceChange={DebounceChange} bgClr={'#1B1C1E'} font={'beat'} name={'TOKEN SYMBOL'} required={true} type={'text'} value={formValue.symbol} />
              </div>
            </div>
            <Image src={"/form bg.png"} alt="bg" aria-hidden width={200} height={300} className="pointer-events-none w-full h-full absolute top-0 left-0 z-0 object-cover object-center mix-blend-color-dodge" />
          </div>
        </div>
        <div className="md:w-1/2 w-full md:h-full h-[92%] flex justify-end items-center xl1120lg:px-14 lg:px-10 md:px-8 px-0 xl:pb-10 lg:pb-8 md:pb-6 pb-4 xl:pt-10 lg:pt-8 md:pt-6 sm570:py-12 py-6 ">
          <div className="w-full h-full">
            <h4 className={`${mont.className} font-black text-white xl:text-4xl lg:text-3xl sm570:text-2xl text-lg w-full md:text-center sm570:text-left text-center md:pt-0 sm570:pt-1 pt-5`}>LAUNCH YOUR TOKEN !</h4>
            <p className={`bg-gradient-to-r from-[#4EA5FF] to-[#B972FF] bg-clip-text text-transparent ${mont.className} font-medium xl:py-2 py-0 pb-3 md:text-center sm570:text-left text-center xl:text-base lg:text-sm sm570:text-xs text-[10px]`}>No presale, No Team Allocation, Lower Gas</p>
            <div className='w-full flex justify-center items-center md:gap-0 gap-2 md:flex-col sm570:flex-row flex-col'>
              <LaunchTextArea DebounceChange={DebounceChange} bgClr={'#111111'} font={'bebas'} name={'TOKEN DESCRIPTION'} required={false} type={'text'} value={formValue.description} />
              <LaunchInput DebounceChange={DebounceChange} bgClr={'#111111'} font={'bebas'} name={'WEBSITE'} required={false} type={'text'} value={formValue.website} />
            </div>
            <div className="flex w-full justify-center items-center sm570:gap-2 gap-1">
              <LaunchInput DebounceChange={DebounceChange} bgClr={'#111111'} font={'bebas'} name={'TELEGRAM'} required={false} type={'text'} value={formValue.telegram} />
              <LaunchInput DebounceChange={DebounceChange} bgClr={'#111111'} font={'bebas'} name={'TWITTER'} required={false} type={'text'} value={formValue.twitter} />
            </div>
            <div className='w-full flex md:flex-col sm570:flex-row flex-col justify-center items-center md:gap-0 sm570:gap-2 gap-0'>
              <LaunchInput DebounceChange={DebounceChange} bgClr={'#111111'} font={'bebas'} name={'INITIAL BUY'} required={false} type={'text'} value={formValue.initialBuy} />
              <div className="w-full flex justify-center sm570:my-3 my-1 items-center">
                <button
                  onClick={(e) => {
                    if (isConnected) {
                      springAni(e);
                      deployTokenAndPool();
                    }
                  }}
                  className="font-cheese sm570:py-2 py-1 sm570:px-10 px-8 xl:text-4xl lg:text-3xl sm570:text-2xl text-lg mx-auto rounded-xl text-white bg-gradient-to-r from-[#FF4672] to-[#B972FF]"
                  style={{ boxShadow: '5px 5px 10px rgba(0,0,0,0.3)' }}
                  disabled={!isConnected || isPending || loading}
                >
                  {loading ? (
                    <div className="flex items-center gap-2">
                      <div className="loader-spinner" /> {/* Placeholder for spinner */}
                      <span>Get ready...</span>
                    </div>
                  ) : isPending ? (
                    'Waiting for User Signature...'
                  ) : (
                    'LAUNCH'
                  )}
                </button>
                {/* Tooltip */}
                {!isConnected && (
                  <span className="absolute -top-[calc(100%+15px)] left-1/2 transform -translate-x-1/2 hidden group-hover:block w-48 bg-gray-800 text-white text-sm text-center py-1 px-2 rounded-lg z-50">
                    Please connect your wallet to launch
                  </span>
                )}
              </div>
            </div>
            <Modal
              isVisible={modal.isVisible}
              title={modal.title}
              message={modal.message}
              isClosable={modal.isClosable}
              ipfsData={modal.ipfsData}
            />
          </div>
        </div>
      </div>
    </div>
  );

};

export function LaunchPageWrapper() {
  return (
    <Suspense>
      <LaunchScreen />
    </Suspense>
  );
}
