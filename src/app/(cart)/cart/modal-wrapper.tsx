'use client';

import { useState, Fragment } from 'react';

import { MdOutlineShoppingCartCheckout } from 'react-icons/md';

import { Button, Modal } from '@/components';
import dynamic from 'next/dynamic';

const Payment = dynamic(() => import('./payment'), {
  ssr: false,
});

const ModalState = { PAYMENTMODAL: 'PAYMENTMODAL' };

export default function ModalWrapper() {
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
      >
        Buy
      </Button>
    </Fragment>
  );
}
