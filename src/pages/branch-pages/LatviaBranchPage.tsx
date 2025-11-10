import React from 'react';
import { BranchPageTemplateV2 } from '../BranchPageTemplateV2';
import { getServiceDetails, countryFlags } from './serviceDetailsHelper';
import { countryConfig } from './countryConfig';

export function LatviaBranchPage() {
  const config = countryConfig.latvia;
  return (
    <BranchPageTemplateV2
      countryKey="latvia"
      countryName="Latvia"
      countryFlag={countryFlags.latvia}
      registrationFee={config.registrationFee}
      processingTime={config.processingTime}
      notaryRequired={config.notaryRequired}
      heroDescription={config.heroDescription}
      serviceDetails={getServiceDetails('Latvia', config.registrationAuthority)}
      price={config.price}
    />
  );
}

