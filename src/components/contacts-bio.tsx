'use client';

import React, { useState } from 'react';
import { Button, Input } from '@/components';

interface IContactsData {
  phNumber: string;
  email: string;
  address: string;
}

interface IChangeContactsProps {
  initialData: IContactsData;
}

const ContactsBio: React.FC<IChangeContactsProps> = ({ initialData }) => {
  const [formData, setFormData] = useState<IContactsData>(initialData);
  const [isEditing, setIsEditing] = useState(false);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    // TODO: Save formData to the database
    setIsEditing(false);
  };

  const handleCancelClick = () => {
    setFormData(initialData);
    setIsEditing(false);
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-row flex-wrap gap-4 ml-4">
        <div>
          <label className="text-blue-600">Phone number: </label>
          {isEditing ? (
            <Input
              className="text-black dark:text-white"
              roundedFull
              type="text"
              name="phNumber"
              value={formData.phNumber}
              onChange={handleInputChange}
            />
          ) : (
            <p className="text-black dark:text-white">{formData.phNumber}</p>
          )}
        </div>
        <div>
          <label className="text-blue-600">Email : </label>
          {isEditing ? (
            <Input
              className="text-black dark:text-white"
              roundedFull
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
            />
          ) : (
            <p className="text-black dark:text-white">{formData.email}</p>
          )}
        </div>
        <div>
          <label className="text-blue-600">Delivery address: </label>
          {isEditing ? (
            <Input
              className="text-black dark:text-white"
              roundedFull
              type="text"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
            />
          ) : (
            <p className="text-black dark:text-white">{formData.address}</p>
          )}
        </div>
      </div>
      {isEditing ? (
        <div className="space-x-2">
          <Button
            className="px-2 py-1"
            variant="outline"
            roundedFull
            onClick={handleSaveClick}
          >
            Save
          </Button>
          <Button
            className="px-2 py-1"
            variant="ghost"
            roundedFull
            onClick={handleCancelClick}
          >
            Cancel
          </Button>
        </div>
      ) : (
        <Button
          className="px-2 py-1"
          variant="ghost"
          roundedFull
          onClick={handleEditClick}
        >
          Edit
        </Button>
      )}
    </div>
  );
};

export default ContactsBio;
