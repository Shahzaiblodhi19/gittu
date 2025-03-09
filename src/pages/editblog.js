import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import Web3 from "web3";
import ReactModal from "react-modal";
import Logo from '../assets/logo.png';
import WalletConnectProvider from "@walletconnect/web3-provider";
import { Link } from "react-router-dom";


ReactModal.setAppElement("#root");

function EditBlog() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalStage, setModalStage] = useState("select"); // ["select", "opening", "connecting", "connected"]
    const [selectedWallet, setSelectedWallet] = useState(null);
    const [walletAddress, setWalletAddress] = useState(null);
    const [installedWallets, setInstalledWallets] = useState([]);
    const [title, setTitle] = useState('');
    const [subHeading, setSubHeading] = useState('');
    const [image, setImage] = useState(null);
    const [date, setDate] = useState('');
    const [description, setDescription] = useState('');

    const { id } = useParams(); // Get the blog ID from URL params
    const navigate = useNavigate();

    // Fetch the blog data if in edit mode
    useEffect(() => {
        if (id) {
            // Fetch blog data from the backend to pre-fill the form
            fetch(`http://localhost:5000/api/blogs/${id}`)
                .then(response => response.json())
                .then(data => {
                    setTitle(data.title);
                    setSubHeading(data.subHeading);
                    setDate(data.date);
                    setDescription(data.description);
                    if (data.image) {
                        // If the image is a relative URL, prepend the base URL
                        const imageUrl = !data.image.startsWith('http') ? data.image : `http://localhost:5000/uploads/${data.image}`;
                        setImage(imageUrl); // Set the image URL correctly
                    } else {
                        setImage(null); // If no image, set to null
                    }
                })
                .catch(error => console.error('Error fetching blog data:', error));
        }
    }, [id]);

    const handleSubmit = (e) => {
        e.preventDefault();

        // Simple form validation
        if (!title || !subHeading || !image || !date || !description) {
            alert('Please fill in all fields!');
            return;
        }

        const formData = new FormData();
        formData.append('title', title);
        formData.append('subHeading', subHeading);
        formData.append('date', date);
        formData.append('description', description);
        if (image) {
            formData.append('image', e.target.image.files[0]);  // Append the file from the form
        }

        const method = id ? 'PUT' : 'POST';  // If editing, use PUT, else POST for creating

        const url = id ? `http://localhost:5000/api/blogs/${id}` : 'http://localhost:5000/api/blogs'; // Use the ID if it's an edit

        // Send data to backend
        fetch(url, {
            method: method,
            body: formData
        })
            .then(response => response.json())
            .then(data => {
                console.log('Blog saved:', data);
                // Clear the form fields after successful submission
                setTitle('');
                setSubHeading('');
                setDate('');
                setDescription('');
                setImage(null); // Clear the image preview

                // Navigate to '/all-blogs' after success
                navigate('/all-blogs');
            })
            .catch(error => {
                console.error('Error:', error);
                alert('Failed to save blog');
            });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(URL.createObjectURL(file));  // Show a preview of the uploaded image
        }
    };
    useEffect(() => {
        const wallets = [];
        if (window.ethereum) {
            wallets.push({
                name: "MetaMask", icon: `data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzUiIGhlaWdodD0iMzQiIHZpZXdCb3g9IjAgMCAzNSAzNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTMyLjcwNzcgMzIuNzUyMkwyNS4xNjg4IDMwLjUxNzRMMTkuNDgzMyAzMy45MDA4TDE1LjUxNjcgMzMuODk5MUw5LjgyNzkzIDMwLjUxNzRMMi4yOTIyNSAzMi43NTIyTDAgMjUuMDQ4OUwyLjI5MjI1IDE2LjQ5OTNMMCA5LjI3MDk0TDIuMjkyMjUgMC4zMTIyNTZMMTQuMDY3NCA3LjMxNTU0SDIwLjkzMjZMMzIuNzA3NyAwLjMxMjI1NkwzNSA5LjI3MDk0TDMyLjcwNzcgMTYuNDk5M0wzNSAyNS4wNDg5TDMyLjcwNzcgMzIuNzUyMloiIGZpbGw9IiNGRjVDMTYiLz4KPHBhdGggZD0iTTIuMjkzOTUgMC4zMTIyNTZMMTQuMDY5MSA3LjMyMDQ3TDEzLjYwMDggMTIuMTMwMUwyLjI5Mzk1IDAuMzEyMjU2WiIgZmlsbD0iI0ZGNUMxNiIvPgo8cGF0aCBkPSJNOS44Mjk1OSAyNS4wNTIyTDE1LjAxMDYgMjguOTgxMUw5LjgyOTU5IDMwLjUxNzVWMjUuMDUyMloiIGZpbGw9IiNGRjVDMTYiLz4KPHBhdGggZD0iTTE0LjU5NjYgMTguNTU2NUwxMy42MDA5IDEyLjEzMzNMNy4yMjY5MiAxNi41MDA5TDcuMjIzNjMgMTYuNDk5M1YxNi41MDI1TDcuMjQzMzUgMjAuOTk4M0w5LjgyODA5IDE4LjU1NjVIOS44Mjk3NEgxNC41OTY2WiIgZmlsbD0iI0ZGNUMxNiIvPgo8cGF0aCBkPSJNMzIuNzA3NyAwLjMxMjI1NkwyMC45MzI2IDcuMzIwNDdMMjEuMzk5MyAxMi4xMzAxTDMyLjcwNzcgMC4zMTIyNTZaIiBmaWxsPSIjRkY1QzE2Ii8+CjxwYXRoIGQ9Ik0yNS4xNzIyIDI1LjA1MjJMMTkuOTkxMiAyOC45ODExTDI1LjE3MjIgMzAuNTE3NVYyNS4wNTIyWiIgZmlsbD0iI0ZGNUMxNiIvPgo8cGF0aCBkPSJNMjcuNzc2NiAxNi41MDI1SDI3Ljc3ODNIMjcuNzc2NlYxNi40OTkzTDI3Ljc3NSAxNi41MDA5TDIxLjQwMSAxMi4xMzMzTDIwLjQwNTMgMTguNTU2NUgyNS4xNzIyTDI3Ljc1ODYgMjAuOTk4M0wyNy43NzY2IDE2LjUwMjVaIiBmaWxsPSIjRkY1QzE2Ii8+CjxwYXRoIGQ9Ik05LjgyNzkzIDMwLjUxNzVMMi4yOTIyNSAzMi43NTIyTDAgMjUuMDUyMkg5LjgyNzkzVjMwLjUxNzVaIiBmaWxsPSIjRTM0ODA3Ii8+CjxwYXRoIGQ9Ik0xNC41OTQ3IDE4LjU1NDlMMTYuMDM0MSAyNy44NDA2TDE0LjAzOTMgMjIuNjc3N0w3LjIzOTc1IDIwLjk5ODRMOS44MjYxMyAxOC41NTQ5SDE0LjU5M0gxNC41OTQ3WiIgZmlsbD0iI0UzNDgwNyIvPgo8cGF0aCBkPSJNMjUuMTcyMSAzMC41MTc1TDMyLjcwNzggMzIuNzUyMkwzNS4wMDAxIDI1LjA1MjJIMjUuMTcyMVYzMC41MTc1WiIgZmlsbD0iI0UzNDgwNyIvPgo8cGF0aCBkPSJNMjAuNDA1MyAxOC41NTQ5TDE4Ljk2NTggMjcuODQwNkwyMC45NjA3IDIyLjY3NzdMMjcuNzYwMiAyMC45OTg0TDI1LjE3MjIgMTguNTU0OUgyMC40MDUzWiIgZmlsbD0iI0UzNDgwNyIvPgo8cGF0aCBkPSJNMCAyNS4wNDg4TDIuMjkyMjUgMTYuNDk5M0g3LjIyMTgzTDcuMjM5OTEgMjAuOTk2N0wxNC4wMzk0IDIyLjY3NkwxNi4wMzQzIDI3LjgzODlMMTUuMDA4OSAyOC45NzZMOS44Mjc5MyAyNS4wNDcySDBWMjUuMDQ4OFoiIGZpbGw9IiNGRjhENUQiLz4KPHBhdGggZD0iTTM1LjAwMDEgMjUuMDQ4OEwzMi43MDc4IDE2LjQ5OTNIMjcuNzc4M0wyNy43NjAyIDIwLjk5NjdMMjAuOTYwNyAyMi42NzZMMTguOTY1OCAyNy44Mzg5TDE5Ljk5MTIgMjguOTc2TDI1LjE3MjIgMjUuMDQ3MkgzNS4wMDAxVjI1LjA0ODhaIiBmaWxsPSIjRkY4RDVEIi8+CjxwYXRoIGQ9Ik0yMC45MzI1IDcuMzE1NDNIMTcuNDk5OUgxNC4wNjczTDEzLjYwMDYgMTIuMTI1MUwxNi4wMzQyIDI3LjgzNEgxOC45NjU2TDIxLjQwMDggMTIuMTI1MUwyMC45MzI1IDcuMzE1NDNaIiBmaWxsPSIjRkY4RDVEIi8+CjxwYXRoIGQ9Ik0yLjI5MjI1IDAuMzEyMjU2TDAgOS4yNzA5NEwyLjI5MjI1IDE2LjQ5OTNINy4yMjE4M0wxMy41OTkxIDEyLjEzMDFMMi4yOTIyNSAwLjMxMjI1NloiIGZpbGw9IiM2NjE4MDAiLz4KPHBhdGggZD0iTTEzLjE3IDIwLjQxOTlIMTAuOTM2OUw5LjcyMDk1IDIxLjYwNjJMMTQuMDQwOSAyMi42NzI3TDEzLjE3IDIwLjQxODJWMjAuNDE5OVoiIGZpbGw9IiM2NjE4MDAiLz4KPHBhdGggZD0iTTMyLjcwNzcgMC4zMTIyNTZMMzQuOTk5OSA5LjI3MDk0TDMyLjcwNzcgMTYuNDk5M0gyNy43NzgxTDIxLjQwMDkgMTIuMTMwMUwzMi43MDc3IDAuMzEyMjU2WiIgZmlsbD0iIzY2MTgwMCIvPgo8cGF0aCBkPSJNMjEuODMzIDIwLjQxOTlIMjQuMDY5NEwyNS4yODUzIDIxLjYwNzlMMjAuOTYwNCAyMi42NzZMMjEuODMzIDIwLjQxODJWMjAuNDE5OVoiIGZpbGw9IiM2NjE4MDAiLz4KPHBhdGggZD0iTTE5LjQ4MTcgMzAuODM2MkwxOS45OTExIDI4Ljk3OTRMMTguOTY1OCAyNy44NDIzSDE2LjAzMjdMMTUuMDA3MyAyOC45Nzk0TDE1LjUxNjcgMzAuODM2MiIgZmlsbD0iIzY2MTgwMCIvPgo8cGF0aCBkPSJNMTkuNDgxNiAzMC44MzU5VjMzLjkwMjFIMTUuNTE2NlYzMC44MzU5SDE5LjQ4MTZaIiBmaWxsPSIjQzBDNENEIi8+CjxwYXRoIGQ9Ik05LjgyOTU5IDMwLjUxNDJMMTUuNTIgMzMuOTAwOFYzMC44MzQ2TDE1LjAxMDYgMjguOTc3OEw5LjgyOTU5IDMwLjUxNDJaIiBmaWxsPSIjRTdFQkY2Ii8+CjxwYXRoIGQ9Ik0yNS4xNzIxIDMwLjUxNDJMMTkuNDgxNyAzMy45MDA4VjMwLjgzNDZMMTkuOTkxMSAyOC45Nzc4TDI1LjE3MjEgMzAuNTE0MloiIGZpbGw9IiNFN0VCRjYiLz4KPC9zdmc+Cg==`, key: "MetaMask"
            });
        }
        if (window.solana?.isPhantom) {
            wallets.push({ name: "Phantom", icon: `data:image/png;base64,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`, key: "Phantom" });
        }
        setInstalledWallets(wallets);
    }, []);

    // Step 1: Open Wallet UI and then Connect
    const handleSelectWallet = async (wallet) => {
        setSelectedWallet(wallet);
        setModalStage("opening");

        setTimeout(async () => {
            setModalStage("connecting");

            try {
                if (wallet === "MetaMask" && window.ethereum) {
                    await window.ethereum.request({
                        method: "wallet_requestPermissions",
                        params: [{ eth_accounts: {} }],
                    });
                    const web3 = new Web3(window.ethereum);
                    const accounts = await web3.eth.requestAccounts();
                    setWalletAddress(accounts[0]);
                    setModalStage("connected");
                    setIsModalOpen(false); // Close the modal immediately after connection
                }

                else if (wallet === "Phantom" && window.solana?.isPhantom) {
                    await window.solana.request({ method: "connect" }); // Opens Phantom UI
                    const response = await window.solana.connect();
                    setWalletAddress(response.publicKey.toString());
                    setModalStage("connected");
                    setIsModalOpen(false); // Close the modal immediately after connection
                }

                else if (wallet === "WalletConnect") {
                    const provider = new WalletConnectProvider({
                        rpc: { 1: "https://mainnet.infura.io/v3/YOUR_INFURA_PROJECT_ID" }
                    });

                    await provider.enable(); // Opens WalletConnect QR
                    const web3 = new Web3(provider);
                    const accounts = await web3.eth.getAccounts();
                    setWalletAddress(accounts[0]);
                    setModalStage("connected");
                    setIsModalOpen(false); // Close the modal immediately after connection
                }

                else {
                    alert("Please install the selected wallet.");
                    setModalStage("select");
                }
            } catch (error) {
                console.error(error);
                alert("Connection failed or rejected.");
                setModalStage("select");
            }
        }, 2000); // Simulate delay while opening wallet
    };
    // Disconnect handler to reset the modal stage
    const handleDisconnectWallet = () => {
        setWalletAddress(null);
        setModalStage("select"); // Reset to "select" so that wallet options are shown
        setIsModalOpen(false)
        alert("Wallet disconnected");
    };

    const handleDropdownSelect = (action) => {
        if (action === "disconnect") {
            handleDisconnectWallet();
        } else if (action === "copy") {
            navigator.clipboard.writeText(walletAddress);
            alert("Wallet address copied to clipboard!");
        }
    };
    const [isScrolled, setIsScrolled] = useState(false);

    const handleScroll = () => {
        if (window.scrollY > 5) {
            setIsScrolled(true); // Add black background when scrolling down
        } else {
            setIsScrolled(false); // Reset to transparent when at the top
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <>
            <header className={`header blog-header ${isScrolled ? 'scrolled' : ''}`}>
                <Link to={'/'} className="logo">
                    <img src={Logo} alt="" />
                </Link>
                <div className="nav">
                    <button><Link style={{ textDecorationLine: 'none', color: 'white' }} to={'/all-blogs'}>Create Blog</Link></button>
                    <button>Whitepaper</button>
                    {walletAddress ? (
                        <button className="wallet-btn d-flex align-items-center" style={{ gap: '8px' }} onClick={() => setIsModalOpen(true)}>
                            {walletAddress.slice(0, 7)}...{walletAddress.slice(-4)}
                            <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 32 36" fill="none">
                                <path d="M17.6142 26.3391C16.7214 27.218 15.2714 27.218 14.3785 26.3391L2.94996 15.0891C2.0571 14.2102 2.0571 12.7828 2.94996 11.9039C3.84282 11.025 5.29282 11.025 6.18568 11.9039L16 21.5648L25.8142 11.9109C26.7071 11.032 28.1571 11.032 29.05 11.9109C29.9428 12.7898 29.9428 14.2172 29.05 15.0961L17.6214 26.3461L17.6142 26.3391Z" fill="white" />
                            </svg>
                        </button>
                    ) : (
                        <button className="wallet-btn" onClick={() => setIsModalOpen(true)}>Connect Wallet</button>
                    )}
                </div>
            </header>
            <ReactModal
                isOpen={isModalOpen}
                onRequestClose={() => setIsModalOpen(false)}
                className="modals"
            >
                {/* Step 1: Select Wallet */}
                {modalStage === "select" && (
                    <>
                        <div className="d-flex align-items-center w-100 mb-2 mt-2">
                            <h2 className="wal-head">CONNECT A WALLET</h2>
                            <button className="w-auto close mt-0" onClick={() => setIsModalOpen(false)} style={{ padding: '11px', borderRadius: '50px' }}><svg aria-hidden="true" fill="none" height="10" viewBox="0 0 10 10" width="10" xmlns="http://www.w3.org/2000/svg"><title>Close</title><path d="M1.70711 0.292893C1.31658 -0.0976311 0.683417 -0.0976311 0.292893 0.292893C-0.0976311 0.683417 -0.0976311 1.31658 0.292893 1.70711L3.58579 5L0.292893 8.29289C-0.0976311 8.68342 -0.0976311 9.31658 0.292893 9.70711C0.683417 10.0976 1.31658 10.0976 1.70711 9.70711L5 6.41421L8.29289 9.70711C8.68342 10.0976 9.31658 10.0976 9.70711 9.70711C10.0976 9.31658 10.0976 8.68342 9.70711 8.29289L6.41421 5L9.70711 1.70711C10.0976 1.31658 10.0976 0.683417 9.70711 0.292893C9.31658 -0.0976311 8.68342 -0.0976311 8.29289 0.292893L5 3.58579L1.70711 0.292893Z" fill="currentColor"></path></svg></button>
                        </div>
                        <div style={{
                            height: '380px',
                            overflowY: 'auto',
                            width: '100%',
                            scrollbarWidth: 'none',  /* For Firefox */
                            msOverflowStyle: 'none'  /* For IE/Edge */
                        }}>
                            <style>
                                {`
                                      div::-webkit-scrollbar {
                                       display: none;
                                      }
                    `                }
                            </style>
                            {installedWallets.length > 0 && <h3 className="subtitle">Installed</h3>}
                            {installedWallets.map((wallet) => (
                                <button key={wallet.key} onClick={() => handleSelectWallet(wallet.key)}>
                                    <img src={wallet.icon} alt={wallet.name} width="27px" height="27px" /> {wallet.name}
                                </button>
                            ))}
                            <h3 className="subtitle2">Recommended</h3>
                            <button onClick={() => handleSelectWallet("WalletConnect")}><img style={{ borderRadius: '5px' }} src={`data:image/svg+xml,<svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">%0A<rect width="28" height="28" fill="%233B99FC"/>%0A<path d="M8.38969 10.3739C11.4882 7.27538 16.5118 7.27538 19.6103 10.3739L19.9832 10.7468C20.1382 10.9017 20.1382 11.1529 19.9832 11.3078L18.7076 12.5835C18.6301 12.6609 18.5045 12.6609 18.4271 12.5835L17.9139 12.0703C15.7523 9.9087 12.2477 9.9087 10.0861 12.0703L9.53655 12.6198C9.45909 12.6973 9.3335 12.6973 9.25604 12.6198L7.98039 11.3442C7.82547 11.1893 7.82547 10.9381 7.98039 10.7832L8.38969 10.3739ZM22.2485 13.012L23.3838 14.1474C23.5387 14.3023 23.5387 14.5535 23.3838 14.7084L18.2645 19.8277C18.1096 19.9827 17.8584 19.9827 17.7035 19.8277C17.7035 19.8277 17.7035 19.8277 17.7035 19.8277L14.0702 16.1944C14.0314 16.1557 13.9686 16.1557 13.9299 16.1944C13.9299 16.1944 13.9299 16.1944 13.9299 16.1944L10.2966 19.8277C10.1417 19.9827 9.89053 19.9827 9.73561 19.8278C9.7356 19.8278 9.7356 19.8277 9.7356 19.8277L4.61619 14.7083C4.46127 14.5534 4.46127 14.3022 4.61619 14.1473L5.75152 13.012C5.90645 12.857 6.15763 12.857 6.31255 13.012L9.94595 16.6454C9.98468 16.6841 10.0475 16.6841 10.0862 16.6454C10.0862 16.6454 10.0862 16.6454 10.0862 16.6454L13.7194 13.012C13.8743 12.857 14.1255 12.857 14.2805 13.012C14.2805 13.012 14.2805 13.012 14.2805 13.012L17.9139 16.6454C17.9526 16.6841 18.0154 16.6841 18.0541 16.6454L21.6874 13.012C21.8424 12.8571 22.0936 12.8571 22.2485 13.012Z" fill="white"/>%0A</svg>%0A`} alt='WalletConnect' width="27px" height="27px" /> WalletConnect</button>
                            <button onClick={() => handleSelectWallet("Coinbase Wallet")}><img style={{ borderRadius: '5px' }} src={`data:image/svg+xml,<svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">%0A<rect width="28" height="28" fill="%232C5FF6"/>%0A<path fill-rule="evenodd" clip-rule="evenodd" d="M14 23.8C19.4124 23.8 23.8 19.4124 23.8 14C23.8 8.58761 19.4124 4.2 14 4.2C8.58761 4.2 4.2 8.58761 4.2 14C4.2 19.4124 8.58761 23.8 14 23.8ZM11.55 10.8C11.1358 10.8 10.8 11.1358 10.8 11.55V16.45C10.8 16.8642 11.1358 17.2 11.55 17.2H16.45C16.8642 17.2 17.2 16.8642 17.2 16.45V11.55C17.2 11.1358 16.8642 10.8 16.45 10.8H11.55Z" fill="white"/>%0A</svg>%0A`} alt='Coinbase Wallet' width="27px" height="27px" /> Coinbase Wallet</button>
                            <button onClick={() => handleSelectWallet("Rainbow")}><img style={{ borderRadius: '5px' }} src={`data:image/svg+xml,<svg width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">%0A<rect width="120" height="120" fill="url(%23paint0_linear_62_329)"/>%0A<path d="M20 38H26C56.9279 38 82 63.0721 82 94V100H94C97.3137 100 100 97.3137 100 94C100 53.1309 66.8691 20 26 20C22.6863 20 20 22.6863 20 26V38Z" fill="url(%23paint1_radial_62_329)"/>%0A<path d="M84 94H100C100 97.3137 97.3137 100 94 100H84V94Z" fill="url(%23paint2_linear_62_329)"/>%0A<path d="M26 20L26 36H20L20 26C20 22.6863 22.6863 20 26 20Z" fill="url(%23paint3_linear_62_329)"/>%0A<path d="M20 36H26C58.0325 36 84 61.9675 84 94V100H66V94C66 71.9086 48.0914 54 26 54H20V36Z" fill="url(%23paint4_radial_62_329)"/>%0A<path d="M68 94H84V100H68V94Z" fill="url(%23paint5_linear_62_329)"/>%0A<path d="M20 52L20 36L26 36L26 52H20Z" fill="url(%23paint6_linear_62_329)"/>%0A<path d="M20 62C20 65.3137 22.6863 68 26 68C40.3594 68 52 79.6406 52 94C52 97.3137 54.6863 100 58 100H68V94C68 70.804 49.196 52 26 52H20V62Z" fill="url(%23paint7_radial_62_329)"/>%0A<path d="M52 94H68V100H58C54.6863 100 52 97.3137 52 94Z" fill="url(%23paint8_radial_62_329)"/>%0A<path d="M26 68C22.6863 68 20 65.3137 20 62L20 52L26 52L26 68Z" fill="url(%23paint9_radial_62_329)"/>%0A<defs>%0A<linearGradient id="paint0_linear_62_329" x1="60" y1="0" x2="60" y2="120" gradientUnits="userSpaceOnUse">%0A<stop stop-color="%23174299"/>%0A<stop offset="1" stop-color="%23001E59"/>%0A</linearGradient>%0A<radialGradient id="paint1_radial_62_329" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(26 94) rotate(-90) scale(74)">%0A<stop offset="0.770277" stop-color="%23FF4000"/>%0A<stop offset="1" stop-color="%238754C9"/>%0A</radialGradient>%0A<linearGradient id="paint2_linear_62_329" x1="83" y1="97" x2="100" y2="97" gradientUnits="userSpaceOnUse">%0A<stop stop-color="%23FF4000"/>%0A<stop offset="1" stop-color="%238754C9"/>%0A</linearGradient>%0A<linearGradient id="paint3_linear_62_329" x1="23" y1="20" x2="23" y2="37" gradientUnits="userSpaceOnUse">%0A<stop stop-color="%238754C9"/>%0A<stop offset="1" stop-color="%23FF4000"/>%0A</linearGradient>%0A<radialGradient id="paint4_radial_62_329" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(26 94) rotate(-90) scale(58)">%0A<stop offset="0.723929" stop-color="%23FFF700"/>%0A<stop offset="1" stop-color="%23FF9901"/>%0A</radialGradient>%0A<linearGradient id="paint5_linear_62_329" x1="68" y1="97" x2="84" y2="97" gradientUnits="userSpaceOnUse">%0A<stop stop-color="%23FFF700"/>%0A<stop offset="1" stop-color="%23FF9901"/>%0A</linearGradient>%0A<linearGradient id="paint6_linear_62_329" x1="23" y1="52" x2="23" y2="36" gradientUnits="userSpaceOnUse">%0A<stop stop-color="%23FFF700"/>%0A<stop offset="1" stop-color="%23FF9901"/>%0A</linearGradient>%0A<radialGradient id="paint7_radial_62_329" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(26 94) rotate(-90) scale(42)">%0A<stop offset="0.59513" stop-color="%2300AAFF"/>%0A<stop offset="1" stop-color="%2301DA40"/>%0A</radialGradient>%0A<radialGradient id="paint8_radial_62_329" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(51 97) scale(17 45.3333)">%0A<stop stop-color="%2300AAFF"/>%0A<stop offset="1" stop-color="%2301DA40"/>%0A</radialGradient>%0A<radialGradient id="paint9_radial_62_329" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(23 69) rotate(-90) scale(17 322.37)">%0A<stop stop-color="%2300AAFF"/>%0A<stop offset="1" stop-color="%2301DA40"/>%0A</radialGradient>%0A</defs>%0A</svg>%0A`} alt='Rainbow' width="27px" height="27px" /> Rainbow</button>
                            <h3 className="subtitle2">Others</h3>
                            <button onClick={() => handleSelectWallet("Trust Wallet")}><img style={{ borderRadius: '5px' }} src={`data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" fill="none" width="28" height="28" viewBox="0 0 28 28"><path fill="%23fff" d="M0 0h28v28H0z"/><path fill="%230500FF" d="M6 7.583 13.53 5v17.882C8.15 20.498 6 15.928 6 13.345V7.583Z"/><path fill="url(%23a)" d="M22 7.583 13.53 5v17.882c6.05-2.384 8.47-6.954 8.47-9.537V7.583Z"/><defs><linearGradient id="a" x1="19.768" x2="14.072" y1="3.753" y2="22.853" gradientUnits="userSpaceOnUse"><stop offset=".02" stop-color="%2300F"/><stop offset=".08" stop-color="%230094FF"/><stop offset=".16" stop-color="%2348FF91"/><stop offset=".42" stop-color="%230094FF"/><stop offset=".68" stop-color="%230038FF"/><stop offset=".9" stop-color="%230500FF"/></linearGradient></defs></svg>%0A`} alt='Trust Wallet' width="27px" height="27px" /> Trust Wallet</button>
                        </div>
                        <div className="d-flex align-items-center justify-content-between w-100 mt-2" >
                            <h2 className="subtitle2">New to Etherium Wallet?</h2>
                            <a className="subtitle mt-1" >Learn More</a>
                        </div>
                    </>
                )}

                {/* Step 2: Opening Wallet */}
                {modalStage === "opening" && (
                    <>
                        {/* Display the selected wallet's icon */}
                        <img
                            src={installedWallets.find(wallet => wallet.key === selectedWallet)?.icon || ''}
                            className="mt-5 mb-4"
                            alt={selectedWallet}
                            width="39px"
                            height="39px"
                        />
                        <h2 style={{ fontSize: '18px', fontWeight: '400' }}>Opening {selectedWallet}...</h2>
                        <p style={{ fontSize: '14px', color: '#a1a1a1', marginTop: '12px' }}>Please wait while {selectedWallet} opens.</p>
                        {/* Add a loader at the bottom */}
                        <div className="loader mb-5">
                            <div className="spinner"></div>
                        </div>
                    </>
                )}

                {/* Step 3: Connecting */}
                {modalStage === "connecting" && (
                    <>
                        {/* Display the selected wallet's icon */}
                        <img
                            src={installedWallets.find(wallet => wallet.key === selectedWallet)?.icon || ''}
                            className="mt-5 mb-4"
                            alt={selectedWallet}
                            width="39px"
                            height="39px"
                        />
                        <h2 style={{ fontSize: '18px', fontWeight: '400' }}>Connecting to {selectedWallet}...</h2>
                        <p style={{ fontSize: '14px', color: '#a1a1a1', marginTop: '12px' }}>Approve the connection in your wallet.</p>
                        {/* Add a loader at the bottom */}
                        <div className="loader mb-5">
                            <div className="spinner"></div>
                        </div>
                    </>
                )}
                {/* Step 3: Connecting */}
                {modalStage === "connected" && (
                    <>
                        <button className="w-auto close mt-0 ml-auto" onClick={() => setIsModalOpen(false)} style={{ marginLeft: 'auto', padding: '11px', borderRadius: '50px' }}><svg aria-hidden="true" fill="none" height="10" viewBox="0 0 10 10" width="10" xmlns="http://www.w3.org/2000/svg"><title>Close</title><path d="M1.70711 0.292893C1.31658 -0.0976311 0.683417 -0.0976311 0.292893 0.292893C-0.0976311 0.683417 -0.0976311 1.31658 0.292893 1.70711L3.58579 5L0.292893 8.29289C-0.0976311 8.68342 -0.0976311 9.31658 0.292893 9.70711C0.683417 10.0976 1.31658 10.0976 1.70711 9.70711L5 6.41421L8.29289 9.70711C8.68342 10.0976 9.31658 10.0976 9.70711 9.70711C10.0976 9.31658 10.0976 8.68342 9.70711 8.29289L6.41421 5L9.70711 1.70711C10.0976 1.31658 10.0976 0.683417 9.70711 0.292893C9.31658 -0.0976311 8.68342 -0.0976311 8.29289 0.292893L5 3.58579L1.70711 0.292893Z" fill="currentColor"></path></svg></button>

                        <div style={{ width: '70px', height: '70px', background: 'rgb(255, 217, 90)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '35px' }}>🤑</div>
                        {walletAddress && <h2 className="my-3" style={{ fontSize: '18px', fontWeight: '400' }}>{walletAddress.slice(0, 7)}...{walletAddress.slice(-4)}</h2>}
                        <div className="d-flex align-items-center justify-content-between w-100" style={{ gap: '18px' }}>
                            <button className="close" style={{ width: '100%', fontSize: '13px', textAlign: 'center', justifyContent: 'center', borderRadius: '7px', padding: '15px', flexDirection: 'column', gap: '12px' }} onClick={() => handleDropdownSelect("copy")}> <svg fill="none" height="16" viewBox="0 0 17 16" width="17" xmlns="http://www.w3.org/2000/svg"><title>Copy</title><path d="M3.04236 12.3027H4.18396V13.3008C4.18396 14.8525 5.03845 15.7002 6.59705 15.7002H13.6244C15.183 15.7002 16.0375 14.8525 16.0375 13.3008V6.24609C16.0375 4.69434 15.183 3.84668 13.6244 3.84668H12.4828V2.8418C12.4828 1.29688 11.6283 0.442383 10.0697 0.442383H3.04236C1.48376 0.442383 0.629272 1.29004 0.629272 2.8418V9.90332C0.629272 11.4551 1.48376 12.3027 3.04236 12.3027ZM3.23376 10.5391C2.68689 10.5391 2.39294 10.2656 2.39294 9.68457V3.06055C2.39294 2.47949 2.68689 2.21289 3.23376 2.21289H9.8783C10.4252 2.21289 10.7191 2.47949 10.7191 3.06055V3.84668H6.59705C5.03845 3.84668 4.18396 4.69434 4.18396 6.24609V10.5391H3.23376ZM6.78845 13.9365C6.24158 13.9365 5.94763 13.6699 5.94763 13.0889V6.45801C5.94763 5.87695 6.24158 5.61035 6.78845 5.61035H13.433C13.9799 5.61035 14.2738 5.87695 14.2738 6.45801V13.0889C14.2738 13.6699 13.9799 13.9365 13.433 13.9365H6.78845Z" fill="currentColor"></path></svg>
                                Copy Address</button>
                            <button className="close" style={{ width: '100%', fontSize: '13px', textAlign: 'center', justifyContent: 'center', borderRadius: '7px', padding: '15px', flexDirection: 'column', gap: '12px' }} onClick={() => handleDropdownSelect("disconnect")}>
                                <svg fill="none" height="16" viewBox="0 0 18 16" width="18" xmlns="http://www.w3.org/2000/svg"><title>Disconnect</title><path d="M2.67834 15.5908H9.99963C11.5514 15.5908 12.399 14.7432 12.399 13.1777V10.2656H10.6354V12.9863C10.6354 13.5332 10.3688 13.8271 9.78772 13.8271H2.89026C2.3092 13.8271 2.0426 13.5332 2.0426 12.9863V3.15625C2.0426 2.60254 2.3092 2.30859 2.89026 2.30859H9.78772C10.3688 2.30859 10.6354 2.60254 10.6354 3.15625V5.89746H12.399V2.95801C12.399 1.39941 11.5514 0.544922 9.99963 0.544922H2.67834C1.12659 0.544922 0.278931 1.39941 0.278931 2.95801V13.1777C0.278931 14.7432 1.12659 15.5908 2.67834 15.5908ZM7.43616 8.85059H14.0875L15.0924 8.78906L14.566 9.14453L13.6842 9.96484C13.5406 10.1016 13.4586 10.2861 13.4586 10.4844C13.4586 10.8398 13.7321 11.168 14.1217 11.168C14.3199 11.168 14.4635 11.0928 14.6002 10.9561L16.7809 8.68652C16.986 8.48145 17.0543 8.27637 17.0543 8.06445C17.0543 7.85254 16.986 7.64746 16.7809 7.43555L14.6002 5.17285C14.4635 5.03613 14.3199 4.9541 14.1217 4.9541C13.7321 4.9541 13.4586 5.27539 13.4586 5.6377C13.4586 5.83594 13.5406 6.02734 13.6842 6.15723L14.566 6.98438L15.0924 7.33984L14.0875 7.27148H7.43616C7.01917 7.27148 6.65686 7.62012 6.65686 8.06445C6.65686 8.50195 7.01917 8.85059 7.43616 8.85059Z" fill="currentColor"></path></svg>
                                Disconnect</button>
                        </div>
                    </>
                )}

            </ReactModal>

            <div className="create-blog-container container mb-4" style={{ marginTop: '130px' }}>
                <form onSubmit={handleSubmit}>
                    <div className="row">
                        <div className="form-group col-md-6">
                            <label htmlFor="title">Title:</label>
                            <input
                                type="text"
                                id="title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder="Enter your title.."
                                required
                            />
                        </div>

                        <div className="form-group col-md-6">
                            <label htmlFor="subHeading">Sub-heading:</label>
                            <input
                                type="text"
                                id="subHeading"
                                value={subHeading}
                                onChange={(e) => setSubHeading(e.target.value)}
                                placeholder="Enter sub-heading here.."
                                required
                            />
                        </div>
                    </div>

                    <div className="row">
                        <div className="form-group col-md-12">
                            <label htmlFor="image">Blog Image:</label>
                            <div className="image-upload">
                                {!image ? (
                                    <input
                                        type="file"
                                        accept="image/*"
                                        id="image"
                                        name="image"
                                        style={{ opacity: 0, position: "absolute", width: "100%", height: "100%" }}
                                        onChange={handleImageChange}
                                        required
                                    />
                                ) : (
                                    <>
                                        <input
                                            type="file"
                                            accept="image/*"
                                            id="image"
                                            name="image"  // Make sure the input has a name for form submission
                                            style={{ opacity: 0, position: "absolute", width: "100%", height: "100%" }} // Make it invisible but still interactive
                                            onChange={handleImageChange}
                                        />
                                        {/* Display preview image from URL if it exists */}
                                        <img
                                            src={image && image.startsWith('blob') ? image : `http://localhost:5000/uploads/${image}`}
                                            alt="Blog preview"
                                            className="image-preview"
                                        />
                                    </>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="form-group col-md-6">
                            <label htmlFor="date">Date:</label>
                            <input
                                type="date"
                                id="date"
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    <div className="form-group col-12">
                        <label htmlFor="description">Description:</label>
                        <textarea
                            id="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Enter your description.."
                            required
                        ></textarea>
                    </div>

                    <button type="submit" className="create-blog-btn">
                        {id ? "Save Changes" : "Create Blog"}
                    </button>
                </form >
            </div >
        </>
    )
}

export default EditBlog