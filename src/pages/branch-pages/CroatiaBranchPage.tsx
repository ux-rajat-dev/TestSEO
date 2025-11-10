import React from 'react';
import { BranchPageTemplateV2 } from '../BranchPageTemplateV2';
import { getServiceDetails, countryFlags } from './serviceDetailsHelper';
import { countryConfig } from './countryConfig';

export function CroatiaBranchPage() {
  const config = countryConfig.croatia;
  return (
    <BranchPageTemplateV2
      countryKey="croatia"
      countryName="Croatia"
      countryFlag={countryFlags.croatia}
      registrationFee={config.registrationFee}
      processingTime={config.processingTime}
      notaryRequired={config.notaryRequired}
      heroDescription={config.heroDescription}
      serviceDetails={getServiceDetails('Croatia', config.registrationAuthority)}
      price={config.price}
    />
  );
}

