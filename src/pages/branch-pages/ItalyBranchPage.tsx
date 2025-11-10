import React from 'react';
import { BranchPageTemplateV2 } from '../BranchPageTemplateV2';
import { getServiceDetails, countryFlags } from './serviceDetailsHelper';
import { countryConfig } from './countryConfig';

export function ItalyBranchPage() {
  const config = countryConfig.italy;
  return (
    <BranchPageTemplateV2
      countryKey="italy"
      countryName="Italy"
      countryFlag={countryFlags.italy}
      registrationFee={config.registrationFee}
      processingTime={config.processingTime}
      notaryRequired={config.notaryRequired}
      heroDescription={config.heroDescription}
      serviceDetails={getServiceDetails('Italy', config.registrationAuthority)}
      price={config.price}
    />
  );
}

