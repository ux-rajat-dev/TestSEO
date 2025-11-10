import React from 'react';
import { BranchPageTemplateV2 } from '../BranchPageTemplateV2';
import { getServiceDetails, countryFlags } from './serviceDetailsHelper';
import { countryConfig } from './countryConfig';

export function HungaryBranchPage() {
  const config = countryConfig.hungary;
  return (
    <BranchPageTemplateV2
      countryKey="hungary"
      countryName="Hungary"
      countryFlag={countryFlags.hungary}
      registrationFee={config.registrationFee}
      processingTime={config.processingTime}
      notaryRequired={config.notaryRequired}
      heroDescription={config.heroDescription}
      serviceDetails={getServiceDetails('Hungary', config.registrationAuthority)}
      price={config.price}
    />
  );
}

