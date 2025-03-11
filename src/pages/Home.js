import React, { useState, useEffect } from "react";
import Web3 from "web3";
import ReactModal from "react-modal";
import Logo from '../assets/logo.png';
import tel_ico from '../assets/tel-ico.svg';
import dis_ico from '../assets/dis-ico.svg';
import twi_ico from '../assets/twi-ico.svg';
import o_ico from '../assets/o-ico.svg';
import WalletConnectProvider from "@walletconnect/web3-provider";
import i_ico from '../assets/i-ico.svg';
import lin_ico from '../assets/lin-ico.svg';
import bg_part from '../assets/bg-part.svg';
import head1 from '../assets/head-img.svg';
import map_bar from '../assets/map-bar.svg';
import head2 from '../assets/head-2.svg';
import referal_img from "../assets/refferal-bg.svg";
import Slider from 'react-slick';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Link } from "react-router-dom";

// Register chart.js elements
ChartJS.register(ArcElement, Tooltip, Legend);

// Modal Style Configuration
ReactModal.setAppElement("#root");

function Home() {
    const [saleProgress, setSaleProgress] = useState(20000);
    const [totalSupply] = useState(100000);
    const [bonus, setBonus] = useState(20);
    const [countdown, setCountdown] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalStage, setModalStage] = useState("select"); // ["select", "opening", "connecting", "connected"]
    const [selectedWallet, setSelectedWallet] = useState(null);
    const [walletAddress, setWalletAddress] = useState(null);

    const [isVideoPlaying, setIsVideoPlaying] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handlePlayClick = () => {
        setIsLoading(true); // Start loading when the play button is clicked
        setIsVideoPlaying(true); // Start playing the video
    };

    const handleVideoLoad = () => {
        setIsLoading(false); // Hide loader once the video is loaded
    };

    // Detect Installed Wallets
    const [installedWallets, setInstalledWallets] = useState([]);

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
                    const walletAddress = accounts[0];
                    setWalletAddress(walletAddress);
                    localStorage.setItem("walletAddress", walletAddress);  // Store wallet address in localStorage
                    setModalStage("connected");
                    setIsModalOpen(false); // Close the modal immediately after connection
                }
                else if (wallet === "Phantom" && window.solana?.isPhantom) {
                    await window.solana.request({ method: "connect" }); // Opens Phantom UI
                    const response = await window.solana.connect();
                    const walletAddress = response.publicKey.toString();
                    setWalletAddress(walletAddress);
                    localStorage.setItem("walletAddress", walletAddress);  // Store wallet address in localStorage
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
                    const walletAddress = accounts[0];
                    setWalletAddress(walletAddress);
                    localStorage.setItem("walletAddress", walletAddress);  // Store wallet address in localStorage
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


    // Countdown Timer (63 days, 8 hours)
    useEffect(() => {
        const targetDate = new Date().setDate(new Date().getDate() + 63);
        const interval = setInterval(() => {
            const now = new Date();
            const timeLeft = targetDate - now;
            setCountdown(timeLeft);
        }, 1000);

        return () => clearInterval(interval);
    }, []);


    const handleBuyNow = () => {
        if (saleProgress < totalSupply) {
            setSaleProgress(saleProgress + 1000); // Example increment for purchase
        }
    };

    const getRemainingTime = (time) => {
        const days = Math.floor(time / (1000 * 60 * 60 * 24));
        const hours = Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((time % (1000 * 60)) / 1000);

        return (
            <>
                <div className="counter">
                    <span className="days">{days}<span className="unit">d</span></span><svg xmlns="http://www.w3.org/2000/svg" width="7" height="24" viewBox="0 0 7 24" fill="none">
                        <rect y="0.0724487" width="6.99656" height="6.60786" rx="1" fill="white" fill-opacity="0.2" />
                        <rect y="17.2529" width="6.99656" height="6.60786" rx="1" fill="white" fill-opacity="0.2" />
                    </svg>
                    <span className="hours">{hours}<span className="unit">h</span></span><svg xmlns="http://www.w3.org/2000/svg" width="7" height="24" viewBox="0 0 7 24" fill="none">
                        <rect y="0.0724487" width="6.99656" height="6.60786" rx="1" fill="white" fill-opacity="0.2" />
                        <rect y="17.2529" width="6.99656" height="6.60786" rx="1" fill="white" fill-opacity="0.2" />
                    </svg>
                    <span className="minutes">{minutes}<span className="unit">m</span></span><svg xmlns="http://www.w3.org/2000/svg" width="7" height="24" viewBox="0 0 7 24" fill="none">
                        <rect y="0.0724487" width="6.99656" height="6.60786" rx="1" fill="white" fill-opacity="0.2" />
                        <rect y="17.2529" width="6.99656" height="6.60786" rx="1" fill="white" fill-opacity="0.2" />
                    </svg>
                    <span className="seconds">{seconds}<span className="unit">s</span></span>
                </div>
            </>
        );
    };

    const percentage = (saleProgress / totalSupply) * 100;


    const handleCopyReferralLink = () => {
        navigator.clipboard.writeText(`gittu-ebon.vercel.app/referral?user=286254`);
        alert("Referral link copied to clipboard!");
    };

    const handleDisconnectWallet = () => {
        setWalletAddress(null);
        localStorage.removeItem("walletAddress");  // Remove wallet address from localStorage
        setModalStage("select"); // Reset to "select" so that wallet options are shown
        setIsModalOpen(false);
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

    const data = {
        labels: [
            '15% Distribute to Community',
            '18% Reserved Funding',
            '13% Founders and Team',
            '9% Advisors',
            '10% Bounty Campaign',
        ],
        datasets: [
            {
                data: [15, 18, 13, 9, 10], // Percentage values
                backgroundColor: ['#5874cf', '#f09790', '#8761a8', '#16bf86', '#ffae57'],
                hoverBackgroundColor: ['#5874cf', '#f09790', '#8761a8', '#16bf86', '#ffae57'],
                borderWidth: 2,
            },
        ],
    };

    // Chart Options
    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'right', // You can change the position to 'left', 'top', 'bottom', or 'right'
                labels: {
                    boxWidth: 25, // Change the width of the color box (circle)
                    padding: 25,  // Spacing between legend items
                    boxRadius: 50, // Adding border radius for rounded corners
                    font: {
                        size: 16, // Adjust font size of the legend text
                        family: 'outfit', // You can also set the font family here
                        weight: '400', // You can adjust the font weight (e.g., 'normal', 'bold', 'lighter')
                    },
                    boxHeight: 10, // Adjust the height of the legend box
                    filter: (legendItem, chartData) => {
                        return legendItem.datasetIndex !== 2; // Example: Filter out the 3rd item from the legend
                    },
                },
                offset: 20,
            },
            tooltip: {
                callbacks: {
                    label: (tooltipItem) => {
                        return `${tooltipItem.label}: ${tooltipItem.raw}%`;
                    },
                },
            },
        },
    };

    const [blogPosts, setblogPosts] = useState([])

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const response = await fetch("https://node-server-beryl.vercel.app/api/blogs");
                const data = await response.json();
                console.log(data)
                setblogPosts(data);  // Set the fetched blogs into state
            } catch (error) {
                console.error("Error fetching blogs:", error);
            }
        };

        fetchBlogs();  // Call the function to fetch blogs
    }, []);
    const settings = {
        infinite: blogPosts.length > 4,
        speed: 500,
        slidesToShow: 4, // Show available slides
        slidesToScroll: 1, // Scroll one slide at a time
        dots: true, // Enable dots for navigation
        autoplay: true, // Enable auto-play
        autoplaySpeed: 2000, // Speed for auto-play
        centerMode: false, // Ensure slides start from the left
        responsive: [
            {
                breakpoint: 1024, // Medium devices (like tablets)
                settings: {
                    slidesToShow: 2, // Show 2 slides on medium screens
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 600, // Small devices (like mobile)
                settings: {
                    slidesToShow: 1, // Show 1 slide on small screens
                    slidesToScroll: 1,
                },
            },
        ],
    };


    const [activeIndex, setActiveIndex] = useState(1);

    const faqData = [
        {
            question: "Can American citizens take part in the crowdsale?",
            answer: "JavaScript is also used in environments that aren’t web-based, such as PDF documents, site-specific browsers, and desktop widgets. Newer and faster JavaScript virtual machines (VMs) and platforms built upon them have also increased the popularity of JavaScript for server-side web applications. On the client side, JavaScript has been traditionally implemented as an interpreted language, but more recent browsers per."
        },
        {
            question: "Does the crowdsale comply with legal regulations?",
            answer: "The legal regulations around crowdsales ensure the project follows the necessary laws and guidelines. In many jurisdictions, a token sale or crowdsale is regulated to protect the investors, as well as to ensure transparency and fairness."
        },
        {
            question: "Can I trade SCR at an exchange?",
            answer: "Yes, SCR (Scorum) can be traded on various exchanges like Binance, and other supported exchanges that offer SCR trading pairs."
        },
        {
            question: "Why is Scorum’s economic model sustainable?",
            answer: "Scorum's model leverages blockchain technology to ensure fairness, transparency, and a direct connection between sports enthusiasts and sports content creators. The decentralized nature supports the long-term growth of the platform."
        },
        {
            question: "Can I mine SCR?",
            answer: "Mining of SCR is possible through proof-of-stake mechanisms, allowing users to earn SCR tokens by staking their tokens. The mining process is secure and sustainable, using blockchain technology to prevent fraud and exploitation."
        }, {
            question: "Does the crowdsale comply with legal regulations?",
            answer: "The legal regulations around crowdsales ensure the project follows the necessary laws and guidelines. In many jurisdictions, a token sale or crowdsale is regulated to protect the investors, as well as to ensure transparency and fairness."
        },
        {
            question: "Can I trade SCR at an exchange?",
            answer: "Yes, SCR (Scorum) can be traded on various exchanges like Binance, and other supported exchanges that offer SCR trading pairs."
        },
        {
            question: "Why is Scorum’s economic model sustainable?",
            answer: "Scorum's model leverages blockchain technology to ensure fairness, transparency, and a direct connection between sports enthusiasts and sports content creators. The decentralized nature supports the long-term growth of the platform."
        },
    ];

    const toggleAnswer = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
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
    const adminAddress = '3CLc2511wqVpJVwN5g2s5ZEcGK5ZwymKJvrHABcC5Ewe';

    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate the email
        if (!email) {
            setMessage('Please enter a valid email.');
            return;
        }

        try {
            const response = await fetch('https://node-server-beryl.vercel.app/api/subscribe', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }),
            });

            const data = await response.json();
            if (response.ok) {
                setMessage(data.message || 'Successfully subscribed!');
            } else {
                setMessage(data.error || 'An error occurred');
            }
        } catch (err) {
            setMessage('An error occurred while subscribing');
        }
    };
    return (
        <>
            <div className="app-section">
                <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
                    <div className="mm">
                        <Link to={'/'} className="logo">
                            <img src={Logo} alt="" />
                        </Link>
                        {walletAddress ? (
                            <button className="wallet-btn hid2  align-items-center" style={{ gap: '8px' }} onClick={() => setIsModalOpen(true)}>
                                {walletAddress.slice(0, 7)}...{walletAddress.slice(-4)}
                                <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 32 36" fill="none">
                                    <path d="M17.6142 26.3391C16.7214 27.218 15.2714 27.218 14.3785 26.3391L2.94996 15.0891C2.0571 14.2102 2.0571 12.7828 2.94996 11.9039C3.84282 11.025 5.29282 11.025 6.18568 11.9039L16 21.5648L25.8142 11.9109C26.7071 11.032 28.1571 11.032 29.05 11.9109C29.9428 12.7898 29.9428 14.2172 29.05 15.0961L17.6214 26.3461L17.6142 26.3391Z" fill="white" />
                                </svg>
                            </button>
                        ) : (
                            <button className="wallet-btn hid2" onClick={() => setIsModalOpen(true)}>Connect Wallet</button>
                        )}
                    </div>
                    <div className="nav">
                        {/* {walletAddress === adminAddress ? <button><Link style={{ textDecorationLine: 'none', color: 'white' }} to={'/all-blogs'}>Create Blog</Link></button> : ''} */}
                        <button><Link style={{ textDecorationLine: 'none', color: 'white' }} to={'/all-blogs'}>Create Blog</Link></button>
                        <button><Link style={{ textDecorationLine: 'none', color: 'white' }} to={'https://gittu-react-landing.vercel.app/assets/whitepaper-BtQddnnY.pdf'}>Whitepaper</Link></button>
                        {walletAddress ? (
                            <button className="wallet-btn hid1 d-flex align-items-center" style={{ gap: '8px' }} onClick={() => setIsModalOpen(true)}>
                                {walletAddress.slice(0, 7)}...{walletAddress.slice(-4)}
                                <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 32 36" fill="none">
                                    <path d="M17.6142 26.3391C16.7214 27.218 15.2714 27.218 14.3785 26.3391L2.94996 15.0891C2.0571 14.2102 2.0571 12.7828 2.94996 11.9039C3.84282 11.025 5.29282 11.025 6.18568 11.9039L16 21.5648L25.8142 11.9109C26.7071 11.032 28.1571 11.032 29.05 11.9109C29.9428 12.7898 29.9428 14.2172 29.05 15.0961L17.6214 26.3461L17.6142 26.3391Z" fill="white" />
                                </svg>
                            </button>
                        ) : (
                            <button className="wallet-btn hid1" onClick={() => setIsModalOpen(true)}>Connect Wallet</button>
                        )}
                    </div>
                </header>
                <div className="container" style={{ paddingTop: '110px' }}>
                    <div className="row">
                        <div className="content col-xl-7 col-12">
                            <img style={{ position: 'absolute', left: '-30px', top: '24px', height: '95%' }} src={bg_part} alt="part-bg" />
                            <div className="sale-details w-100">
                                <h1>Invest in the  <img className="mx-3 mb-1 i1" src={head1} alt="" /> <br /> </h1>
                                <h1 className="mt-3"><span style={{ color: '#65EA88' }} >Future </span> of <img className="mx-2 i2" src={head2} alt="" />  Finance</h1>
                                <p className="par ">Buy tokens now and reap the benefits of the blockchain revolution!</p>

                                <div className="d-flex align-items-center justify-content-between bars" style={{ width: '80%' }}>
                                    <p className="progress-info">Stage 1: {bonus}% Bonus!</p>
                                    <div className="progress-info">
                                        <span>{saleProgress}/{totalSupply}</span>
                                    </div>
                                </div>
                                <div className="progress-bar bars">
                                    <div className="progress-bar-fill" style={{ width: `${percentage}%` }}>
                                        {`${percentage}%`}
                                    </div>
                                </div>
                                <p className="mt-4 text-white mm">1 GITTU = 0.001 USD <br />
                                    NEXT STAGE = 0.002 USD</p>

                                <button className="buy-now" onClick={handleBuyNow}>BUY NOW</button>
                            </div>




                        </div>
                        <div className="col-xl-5 col-12">
                            <div className="right-sec ">
                                <div style={{ position: 'relative', width: '100%', height: '100%' }}>
                                    <div className="overlay-img">
                                        <img src="data:image/svg+xml,%3csvg%20width='106'%20height='129'%20viewBox='0%200%20106%20129'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cg%20clip-path='url(%23clip0_2_1188)'%3e%3cpath%20d='M106%2087.865C106%20100.466%20102.25%20109.922%2095.9538%20115.533C93.9708%20117.302%2082.073%20125.589%2079.624%20126.572C71.3489%20129.895%2070.2853%20121.721%2058.5655%20115.013C32.3674%20100.021%2011.1309%2063.557%2011.1309%2033.57C11.1309%2022.1322%203.49564%2020.4352%208.77086%2014.7016C10.1437%2013.2104%2022.3932%204.7843%2024.0457%203.72159C32.6936%20-1.8314%2044.9601%20-1.36515%2058.5655%206.42248C84.7636%2021.4139%20106%2057.878%20106%2087.865Z'%20fill='url(%23paint0_linear_2_1188)'/%3e%3cpath%20d='M94.8649%2095.43C94.8649%20125.417%2073.6284%20137.573%2047.4303%20122.578C21.2322%20107.582%200%2071.1178%200%2041.1308C0%2011.1438%2021.2364%20-1.00811%2047.4345%2013.9833C73.6284%2028.9789%2094.8649%2065.443%2094.8649%2095.43Z'%20fill='url(%23paint1_linear_2_1188)'/%3e%3cpath%20d='M76.9509%20119.128C93.3333%20109.751%2093.3338%2079.3473%2076.9519%2051.2195C60.5701%2023.0917%2034.0094%207.89102%2017.627%2017.2678C1.24456%2026.6446%201.2441%2057.0481%2017.6259%2085.1759C34.0078%20113.304%2060.5685%20128.504%2076.9509%20119.128Z'%20stroke='%2384E4A4'%20stroke-width='0.6873'%20stroke-miterlimit='10'/%3e%3c/g%3e%3cdefs%3e%3clinearGradient%20id='paint0_linear_2_1188'%20x1='166.254'%20y1='28.7716'%20x2='55.8176'%20y2='64.1084'%20gradientUnits='userSpaceOnUse'%3e%3cstop%20offset='0.0873'%20stop-color='%2384E4A4'/%3e%3cstop%20offset='0.9709'%20stop-color='%233C53D7'/%3e%3c/linearGradient%3e%3clinearGradient%20id='paint1_linear_2_1188'%20x1='45.5899'%20y1='22.1576'%20x2='3.18783'%20y2='106.806'%20gradientUnits='userSpaceOnUse'%3e%3cstop%20offset='0.0873'%20stop-color='%2384E4A4'/%3e%3cstop%20offset='0.9709'%20stop-color='%233C53D7'/%3e%3c/linearGradient%3e%3cclipPath%20id='clip0_2_1188'%3e%3crect%20width='106'%20height='129'%20fill='white'/%3e%3c/clipPath%3e%3c/defs%3e%3c/svg%3e" alt="coin" />
                                    </div>
                                    <div className="bg-blur-right">
                                        <div className="countdown">
                                            <h2>Pre-Sale ends in</h2>
                                            <h1>{getRemainingTime(countdown)}</h1>
                                            <div className="socials mt-5">
                                                <a href='https://web.telegram.org/'><img src={tel_ico} alt="telegram" /></a>
                                                <a href='https://discord.com/'><img src={dis_ico} alt="discord" /></a>
                                                <a href='https://twitter.com/'><img src={twi_ico} alt="twitter" /></a>
                                                <a href='https://medium.com/'><img src={o_ico} alt="medium" /></a>
                                                <a href='https://www.reddit.com/?rdt=49993'><img src={i_ico} alt="reddit" /></a>
                                                <a href='https://www.linkedin.com/'><img src={lin_ico} alt="linkedin" /></a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Wallet Connection Modal */}
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
                                <div className="bn" style={{
                                    maxHeight: '380px',
                                    height: 'auto',
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
                </div>
            </div>
            <div className="container-afflit">
                <h2 className="h" style={{ color: '#fff',textAlign: 'center',marginBottom: '50px',fontSize: '34px' }}>Affiliate Program</h2>
                <div className="container">
                    <div className="roadmap-header w-100 text-center" style={{ marginBottom: '65px' }}>
                        <h2 className="map-head" style={{ color: '#0094ff', fontSize: '17px' }}>How it works</h2>
                        <h1 className="map-main-head text-center" >Simple Steps to Cashback <br /> Rewards
                        </h1>
                    </div>
                    <div className="container-affli">
                        <div className="left">
                            <div className="car d-flex">
                                <img src="https://blockdag.network/icons/referral-link.svg" style={{ width: 'calc(min(1px, 0.06944vw)*48)' }} height={'auto'} alt="" />
                                <div className="info">
                                    <h2>1. Use your affiliate link to <br /> get started.</h2>
                                    <p>Every user will receive a unique Affiliate code upon connecting their wallet.</p>
                                </div>
                            </div>
                            <div className="car d-flex">
                                <img src="https://blockdag.network/icons/affiliate-system.svg" style={{ width: 'calc(min(1px, 0.06944vw)*48)' }} height={'auto'} alt="" />
                                <div className="info">
                                    <h2>2. Affiliate Program Works For <br /> You Perfectly</h2>
                                    <p>Share it with your friends and community!</p>
                                </div>
                            </div>
                            <div className="car d-flex">
                                <img src="https://blockdag.network/icons/tether.svg" style={{ width: 'calc(min(1px, 0.06944vw)*48)' }} height={'auto'} alt="" />
                                <div className="info">
                                    <h2>3. Start Earning USDT Immediately</h2>
                                    <p>Earn USDT BEP-20 cashback for every <br /> purchase made by your links. You'll receive 5% <br /> cashback instantly!</p>
                                </div>
                            </div>
                        </div>
                        <div className="right">
                            <img src="https://blockdag.network/images/referral-steps.webp" alt="image" />
                        </div>
                    </div>
                </div>
            </div>
            <div className="refferal-section">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6 col-12 pt-4">
                            <div className="referral-section w-100" style={{ marginTop: '80px', paddingLeft: '140px' }}>
                                <h2 style={{ fontSize: '25px' }}>Share Your Referral Link</h2>
                                <p className="mt-4" style={{ color: '#c1cade', fontSize: '14px', paddingRight: '130px' }}>Copy and share your referral link to start earning rewards. The more people you refer, the more you earn!</p>
                                <div className="referral-link" style={{ marginTop: '40px' }}>
                                    <input
                                        style={{ fontWeight: '600' }}
                                        type="text"
                                        value={`https://gittu-ebon.vercel.app/referral?user=286254`}
                                        readOnly
                                    />
                                    <button onClick={handleCopyReferralLink} style={{ background: '#030D43' }}>Copy</button>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6 col-12">
                            <img className="refi" src={referal_img} style={{ width: '500px', height: '400px', marginLeft: '20px' }} alt="referal=img" />
                        </div>
                    </div>
                </div>
            </div>
            <div className="video-container" style={{ position: 'relative' }}>
                {!isVideoPlaying ? (
                    <div className="bg-image">
                        <div className="play-button" onClick={handlePlayClick}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="110" height="110" viewBox="0 0 194 194" fill="none">
                                <path d="M194 97C194 150.572 150.572 194 97 194C43.4284 194 0 150.572 0 97C0 43.4284 43.4284 0 97 0C150.572 0 194 43.4284 194 97Z" fill="#F57D6F" />
                                <path d="M84 77L120 97.5L84 118V77Z" fill="white" />
                            </svg>
                            <span>Video Presentation</span>
                        </div>
                    </div>
                ) : (
                    <div className="video-player d-flex align-items-center justify-content-center">
                        {isLoading && (
                            <div className="bg-image">
                                <div className="loader m-auto" style={{ position: 'absolute', top: '45%', left: '50%' }}>
                                    <div className="spinner" ></div>
                                </div>
                            </div>
                        )}
                        <iframe
                            src="https://player.vimeo.com/video/44309170"
                            width="100%"
                            height="100%"
                            frameBorder="0"
                            allow="autoplay; fullscreen"
                            allowFullScreen
                            title="Video Presentation"
                            onLoad={handleVideoLoad} // Handle when the video is fully loaded
                        ></iframe>
                    </div>
                )}
            </div>
            <div className="roadmap-container" style={{ padding: '140px 0' }}>
                <div className="roadmap-content">
                    <div className="roadmap-header">
                        <h2 className="map-head">Our Special Way</h2>
                        <h1 className="map-main-head">Crypterium Road Map</h1>
                    </div>
                    <div className="timeline" style={{ marginTop: '110px' }}>
                        <div className="d-flex align-items-center mb-2" style={{ gap: '100px' }}>
                            <div className="label">June 2017</div>
                            <div className="label" style={{ marginLeft: '9px' }}>July 2017</div>
                            <div className="label">December 2017</div>
                            <div className="label" style={{ marginLeft: '-25px' }}>December 2017</div>
                            <div className="label" style={{ marginLeft: '-18px' }}>January 2018</div>
                            <div className="label" style={{ marginLeft: '-5px' }}>January 2018</div>
                            <div className="label" style={{ marginLeft: '-0px' }}>April 2018</div>
                        </div>

                        <img style={{ marginBottom: '-34px' }} src={map_bar} alt="" />

                        <div className="d-flex align-items-center mb-2" style={{ gap: '100px' }}>
                            <div className="label" style={{ marginLeft: '-25px', width: '100px', fontSize: '15px', fontWeight: '500' }}>Stats Center Beta</div>
                            <div className="label" style={{ marginLeft: '-30px', width: '100px', fontSize: '15px', fontWeight: '500' }}>BI Intergration</div>
                            <div className="label" style={{ marginLeft: '-24px', width: '100px', fontSize: '15px', fontWeight: '500' }}>Fantasy Prototype</div>
                            <div className="label" style={{ marginLeft: '-26px', width: '100px', fontSize: '15px', fontWeight: '500' }}>Tokens Crowdsale</div>
                            <div className="label" style={{ marginLeft: '-24px', width: '100px', fontSize: '15px', fontWeight: '500' }}>Blogging Platform</div>
                            <div className="label" style={{ marginLeft: '-25px', width: '100px', fontSize: '15px', fontWeight: '500' }}>Blogging Platform</div>
                            <div className="label" style={{ marginLeft: '-22px', width: '100px', fontSize: '14px', fontWeight: '500' }}>Fantasy Sports with SCR</div>
                        </div>
                    </div>
                </div>
            </div >
            <div className="token-distribution-container">
                <div className="heading">
                    <h2 className="map-head" style={{ color: '#000' }}>Our Data</h2>
                    <h1 className="map-main-head" style={{ color: '#000' }}>Token Distribution</h1>
                </div>
                <div className="chart-container">
                    <div className="description pl-4">
                        <p className="one">Spend real fights effective anything extra by leading. Mouthwatering leading how real</p>
                        <p className="two">Coolie loach African lungfish Redfin perch flying characin alooh armorhead pelagic cod moonfish candiru Oriental loach spikefish tang boafish peacock flounder</p>
                    </div>
                    <div className="chart__wrap p-0" style={{ width: '700px', height: '600px', margin: '-90px 0' }}>
                        {/* Chart */}
                        <Doughnut style={{ width: '700px', height: '600px' }} data={data} options={options} />
                    </div>
                </div>

            </div>
            <div className="slider-container container" style={{ position: 'relative', height: '100vh' }}>
                <div className="heading" style={{ margin: '50px 0 80px 0' }}>
                    <h1 className="map-main-head" style={{ color: '#000' }}>Latest News & Blog</h1>
                </div>
                {blogPosts.length !== 0 ? <Slider {...settings}>
                    {blogPosts.map((post, index) => (
                        <div key={index} className="slider-item">
                            <div className="image-w">
                                <img src={!post.image ? post.image : `https://node-server-beryl.vercel.app/uploads/${post.image}`} alt={post.title} />
                            </div>
                            <div className="post-info">
                                <h3>{post.subHeading}</h3>
                                <h4 style={{ color: '#000' }}><Link to={`/view-blog/${post._id}`} style={{ color: 'inherit', textDecorationLine: 'none' }}>{post.title}</Link> </h4>
                                <p style={{ color: '#000' }}>{post.description.slice(0, 110) + ' ...'}</p>
                                <small style={{ color: '#000' }}>{post.date}</small>
                            </div>
                        </div>
                    ))}
                </Slider> : <div className="loader m-auto" style={{ position: 'absolute', top: '45%', left: '50%' }}>
                    <div className="spinner" style={{ color: '#000' }}></div>
                </div>}
            </div>
            <div className="faq-container text-center container" style={{ marginTop: '120px' }}>
                <div className="heading" style={{ margin: '0px 0 60px 0' }}>
                    <h1 className="map-main-head" style={{ color: '#000' }}>Have any questions?</h1>
                </div>
                <div className="faq-list">
                    {faqData.map((faq, index) => (
                        <div key={index} className="faq-item">
                            <div
                                className={`faq-question ${activeIndex === index ? 'active' : ''}`}
                                onClick={() => toggleAnswer(index)}
                            >
                                {faq.question}
                                <span className={`faq-icon `}> {activeIndex === index ? <svg xmlns="http://www.w3.org/2000/svg" width="12" height="10" viewBox="0 0 12 10" fill="none">
                                    <path d="M5.13397 0.5C5.51887 -0.166667 6.48113 -0.166667 6.86603 0.5L11.1962 8C11.5811 8.66667 11.0999 9.5 10.3301 9.5H1.66987C0.900073 9.5 0.418948 8.66667 0.803848 8L5.13397 0.5Z" fill="white" />
                                </svg> : <svg xmlns="http://www.w3.org/2000/svg" width="12" height="10" viewBox="0 0 12 10" fill="none">
                                    <path d="M5.13397 9.5C5.51887 10.1667 6.48113 10.1667 6.86603 9.5L11.1962 2C11.5811 1.33333 11.0999 0.5 10.3301 0.5H1.66987C0.900073 0.5 0.418948 1.33333 0.803848 2L5.13397 9.5Z" fill="#B8B8B8" />
                                </svg>}</span>
                            </div>
                            {activeIndex === index && <div className="faq-answer text-start">{faq.answer}</div>}
                        </div>
                    ))}
                </div>
            </div>
            <footer className="footer">
                <div className="container">
                    <div className="footer-content">
                        <div className="footer-logo">
                            <img src={Logo} alt="Logo" className="footer-logo-img" />
                            <p>
                                Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for ‘lorem ipsum’ will uncover many websites still in their infancy.
                            </p>
                        </div>
                        <div className="footer-menu">
                            <h3>Main menu</h3>
                            <div className="d-flex align-items-center" style={{ gap: '60px' }}>
                                <ul>
                                    <li><a href="#home">Home</a></li>
                                    <li><a href="#about">About Us</a></li>
                                    <li><a href="#contacts">Contacts</a></li>
                                    <li><a href="#news">News</a></li>
                                </ul>
                                <ul>
                                    <li><a href="#events">Events</a></li>
                                    <li><a href="#wallet">Wallet</a></li>
                                    <li><a href="#faqs">FAQs</a></li>
                                    <li><a href="#support">Support</a></li>
                                </ul>
                            </div>
                        </div>
                        <div className="footer-subscribe">
                            <h3>Subscribe</h3>
                            <div className="referral-link py-1" style={{ width: '357px', borderRadius: '50px' }}>
                                <input
                                    type="email"
                                    placeholder="Email"
                                    className="email-input"
                                    style={{ borderRadius: '50px' }}
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                <button
                                    style={{ borderRadius: '50px', fontSize: '17px' }}
                                    className="py-2"
                                    onClick={handleSubmit}
                                >
                                    Subscribe
                                </button></div>
                        </div>
                    </div>
                </div>
                <div className="footer-bottom container">
                    <p>© 2018, Gittu All rights reserved. | <a href="#privacy">Privacy Policy</a> | <a href="#sitemap">Sitemap</a></p>
                </div>
            </footer>
        </>
    )
}

export default Home