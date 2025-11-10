import React from 'react';
import { BranchPageTemplateV2 } from '../BranchPageTemplateV2';
import { getServiceDetails, countryFlags } from './serviceDetailsHelper';
import { countryConfig } from './countryConfig';

export function RomaniaBranchPage() {
  const config = countryConfig.romania;
  return (
    <BranchPageTemplateV2
      countryKey="romania"
      countryName="Romania"
      countryFlag={countryFlags.romania}
      registrationFee={config.registrationFee}
      processingTime={config.processingTime}
      notaryRequired={config.notaryRequired}
      heroDescription={config.heroDescription}
      serviceDetails={getServiceDetails('Romania', config.registrationAuthority)}
      price={config.price}
    />
  );
}

