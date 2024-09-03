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
      <Avatar alt="Remy Sharp" className="text-center" sx={{ width: 56, height: 56 }} src={avatar} />

        {/* Basic Info */}
        <div>
          <h3 className="font-bold">Basic Information</h3>
          <p><strong>Email:</strong> {formData.email || 'Not provided'}</p>
          <p><strong>Username:</strong> {formData.username || 'Not provided'}</p>
        </div>

        {/* Location Info */}
        <div>
          <h3 className="font-bold">Location</h3>
          <p><strong>City:</strong> {formData.city?.label || 'Not provided'}</p>
          <p><strong>Country:</strong> {formData.country?.label || 'Not provided'}</p>
        </div>

        {/* Profile Info */}
        <div>
          <h3 className="font-bold">Profile</h3>
          <p><strong>Bio:</strong> {formData.profile.bio || 'Not provided'}</p>
          <p><strong>Twitter:</strong> {formData.profile.twitter || 'Not provided'}</p>
          <p><strong>Instagram:</strong> {formData.profile.instagram || 'Not provided'}</p>
          <p><strong>Facebook:</strong> {formData.profile.facebook || 'Not provided'}</p>
          <p><strong>Deezer:</strong> {formData.profile.deezer || 'Not provided'}</p>
          <p><strong>Spotify:</strong> {formData.profile.spotify || 'Not provided'}</p>
          <p><strong>Tidal:</strong> {formData.profile.tidal || 'Not provided'}</p>
          <p><strong>Other Platforms:</strong> {formData.profile.otherPlatforms || 'Not provided'}</p>
        </div>

        {/* Professions */}
        <div>
          <h3 className="font-bold">Professions</h3>
          <ul>
            {formData.professions.length > 0 ? formData.professions.map((profession, index) => (
              <li key={index}>{profession.name}</li>
            )) : <p>Not provided</p>}
          </ul>
        </div>

        {/* Materials */}
        <div>
          <h3 className="font-bold">Materials</h3>
          <ul>
            {formData.materials.length > 0 ? formData.materials.map((material, index) => (
              <li key={index}>{material.brand} : {material.model}</li>
            )) : <p>Not provided</p>}
          </ul>
        </div>

      </div>
    </div>
  );
};

export default SummaryView;
