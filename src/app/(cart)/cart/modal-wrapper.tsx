'use client';

import { useState, Fragment } from 'react';
import dynamic from 'next/dynamic';

import { MdOutlineShoppingCartCheckout } from 'react-icons/md';

import { Button, Modal } from '@/components';
import { useCart } from '@/context/cart-context';

const Payment = dynamic(() => import('./payment'), {
  ssr: false,
});

const ModalState = { PAYMENTMODAL: 'PAYMENTMODAL' };

export default function ModalWrapper() {
  const { cart } = useCart();
  const [modalState, setModalState] = useState<string | null>(null);

  const openModal = () => setModalState(ModalState.PAYMENTMODAL);
  const closeModal = () => setModalState(null);

  return (
    <Fragment>
      <Modal
        headerLabel="PaymentMethood"
        isActive={modalState === ModalState.PAYMENTMODAL}
        handleClose={closeModal}
      >
        <Payment />
      </Modal>

      <Button
        color="warning"
        fullWidth
        leftIcon={<MdOutlineShoppingCartCheckout size={25} />}
        onClick={openModal}
        isDisabled={cart.length === 0}
      >
        Buy
      </Button>
    </Fragment>
  );
}
