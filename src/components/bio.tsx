'use client';

import React, { useState } from 'react';
import { Button, Input } from '@/components';

interface IBioData {
  firstName: string;
  lastName: string;
  gender: string;
  birthDate: string;
}

interface IChangeBioProps {
  initialData: IBioData;
}

const Bio: React.FC<IChangeBioProps> = ({ initialData }) => {
  const [formData, setFormData] = useState<IBioData>(initialData);
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
          <label className="text-blue-600">Last name: </label>
          {isEditing ? (
            <Input
              className="text-black dark:text-white"
              roundedFull
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
            />
          ) : (
            <p className="text-black dark:text-white">{formData.lastName}</p>
          )}
        </div>
        <div>
          <label className="text-blue-600">First name: </label>
          {isEditing ? (
            <Input
              className="text-black dark:text-white"
              roundedFull
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
            />
          ) : (
            <p className="text-black dark:text-white">{formData.firstName}</p>
          )}
        </div>
        <div>
          <label className="text-blue-600">Gender: </label>
          {isEditing ? (
            <Input
              className="text-black dark:text-white"
              roundedFull
              type="text"
              name="gender"
              value={formData.gender}
              onChange={handleInputChange}
            />
          ) : (
            <p className="text-black dark:text-white">{formData.gender}</p>
          )}
        </div>
        <div>
          <label className="text-blue-600">BirthDate: </label>
          {isEditing ? (
            <Input
              className="text-black dark:text-white"
              roundedFull
              type="date"
              name="birthDate"
              value={formData.birthDate}
              onChange={handleInputChange}
            />
          ) : (
            <p className="text-black dark:text-white">{formData.birthDate}</p>
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

export default Bio;
