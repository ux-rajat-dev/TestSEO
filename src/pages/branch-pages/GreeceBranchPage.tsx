import React from 'react';
import { BranchPageTemplateV2 } from '../BranchPageTemplateV2';
import { getServiceDetails, countryFlags } from './serviceDetailsHelper';
import { countryConfig } from './countryConfig';

export function GreeceBranchPage() {
  const config = countryConfig.greece;
  return (
    <BranchPageTemplateV2
      countryKey="greece"
      countryName="Greece"
      countryFlag={countryFlags.greece}
      registrationFee={config.registrationFee}
      processingTime={config.processingTime}
      notaryRequired={config.notaryRequired}
      heroDescription={config.heroDescription}
      serviceDetails={getServiceDetails('Greece', config.registrationAuthority)}
      price={config.price}
    />
  );
}

