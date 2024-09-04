import React from 'react';
import { Description } from '@mui/icons-material';
import FormSectionHeader from './form/FormSectionHeader';
import { FormData } from '../@type/forms';
import Avatar from '@mui/material/Avatar';


interface SummaryViewProps {
  formData: FormData;
  avatar: string
}

const SummaryView: React.FC<SummaryViewProps> = ({ formData, avatar }) => {
  console.log(formData);

  return (
    <div className="space-y-4">
      <FormSectionHeader icon={Description} title="Summary" />
      <p className="text-center">
        Review your information before submitting.
      </p>

      <div className="space-y-2">
        <Avatar alt="Remy Sharp" className="text-center mx-auto" sx={{ width: 180, height: 180 }} src={avatar} />

        {/* Basic Info */}
        <div className='mx-auto w-3/4 text-center'>
          <h3 className="font-bold">Basic Information</h3>
          <div className='text-justify w-fit mx-auto my-2'>
            <p><strong>Email:</strong> {formData.email || 'Not provided'}</p>
            <p><strong>Username:</strong> {formData.username || 'Not provided'}</p>
          </div>
        </div>

        {/* Location Info */}
        <div className='mx-auto w-3/4 text-center'>
          <h3 className="font-bold">Location</h3>
          <div className='text-justify w-fit mx-auto my-2'>
            <p><strong>City:</strong> {formData.citySelected?.label || 'Not provided'}</p>
            <p><strong>Country:</strong> {formData.countrySelected?.label || 'Not provided'}</p>
          </div>
        </div>

        {/* Profile Info */}
        <div className='mx-auto w-3/4 text-center'>
          <h3 className="font-bold">Profile</h3>
          <div className='text-justify w-fit mx-auto my-2'>
            <p><strong>Bio:</strong> {formData.profileInfos.bio || 'Not provided'}</p>
            <p><strong>Twitter:</strong> {formData.profileInfos.twitter || 'Not provided'}</p>
            <p><strong>Instagram:</strong> {formData.profileInfos.instagram || 'Not provided'}</p>
            <p><strong>Facebook:</strong> {formData.profileInfos.facebook || 'Not provided'}</p>
            <p><strong>Deezer:</strong> {formData.profileInfos.deezer || 'Not provided'}</p>
            <p><strong>Spotify:</strong> {formData.profileInfos.spotify || 'Not provided'}</p>
            <p><strong>Tidal:</strong> {formData.profileInfos.tidal || 'Not provided'}</p>
            <p><strong>Other Platforms:</strong> {formData.profileInfos.otherPlatforms || 'Not provided'}</p>
          </div>
        </div>

        {/* Professions */}
        <div className='mx-auto w-3/4 text-center'>
          <h3 className="font-bold">Professions</h3>
          <div className='text-justify w-fit mx-auto my-2'>
            <ul>
              {formData.professions.length > 0 ? formData.professions.map((profession, index) => (
                <li key={index}>{profession.name}</li>
              )) : <p>Not provided</p>}
            </ul>
          </div>
        </div>

        {/* Materials */}
        <div className='mx-auto w-3/4 text-center'>
          <h3 className="font-bold">Materials</h3>
          <div className='text-justify w-fit mx-auto my-2'>
            <ul>
              {formData.equipments.length > 0 ? formData.equipments.map((material, index) => (
                <li key={index}>{material.brand} : {material.model}</li>
              )) : <p>Not provided</p>}
            </ul>
          </div>
        </div>

      </div>
    </div>
  );
};

export default SummaryView;
