import s from './ModalAuction.module.scss'
import { useAuth } from '../../context/authContenxt';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';


interface ModalAuction {
    isOpen: boolean;
    onClose: () => void;
    nft: string;
    startingPrice: number;
    endTime: string
}

const ModalAuction = ({ isOpen, onClose, nft, startingPrice, endTime }: ModalAuction) => {
    const { token } = useAuth();
    const [auctionId, setAuctionId] = useState(null);

    useEffect(() => {
        console.log("Id updated")
    }, [auctionId])

    if (!isOpen) return null;

    const createAuction = async () => {
        if (!token) {
            toast.error("You have not token")
        }

        try {

            const response = await axios.post(`https://nft-market-as0q.onrender.com/auctions/`, {
                nft, startingPrice, endTime
            }, {

                headers: { Authorization: `Bearer ${token}` },
            })
            console.log(response.data)
            const result = response.data
            if (response.status === 201) {
                toast.success("Auction was successfully created");
                setAuctionId(result?._id);
                console.log("auctionId set to:", result?._id);
                localStorage.setItem("auctionId", result?._id);

                onClose();
            }
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <section className={s.modal}>
            <div className={s.modalContent}>
                <h1 className={s.createTitle}>Create Auction?</h1>
                <div className={s.modalButtons}>
                    <button className={s.modalAdd} onClick={createAuction} >Create Auction</button>
                    <button className={s.modalCancel} onClick={onClose}>Cancel</button>
                </div>
            </div>

        </section >
    )
}

export default ModalAuction
