import React from 'react';
import { BranchPageTemplateV2 } from '../BranchPageTemplateV2';
import { getServiceDetails, countryFlags } from './serviceDetailsHelper';
import { countryConfig } from './countryConfig';

export function SloveniaBranchPage() {
  const config = countryConfig.slovenia;
  return (
    <BranchPageTemplateV2
      countryKey="slovenia"
      countryName="Slovenia"
      countryFlag={countryFlags.slovenia}
      registrationFee={config.registrationFee}
      processingTime={config.processingTime}
      notaryRequired={config.notaryRequired}
      heroDescription={config.heroDescription}
      serviceDetails={getServiceDetails('Slovenia', config.registrationAuthority)}
      price={config.price}
    />
  );
}

