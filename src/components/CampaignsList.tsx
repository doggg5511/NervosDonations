import React, {useState} from 'react';
import {CampaignCard} from "@/components/CampaignCard.tsx";
import {Center, Loader, Stack} from "@mantine/core";
import DonationModal from "@/components/DonationModal.tsx";
import {useDisclosure} from "@mantine/hooks";

type CampaignsListProps = {
    isLoading: boolean,
    campaigns: {
        address: string
        amount: number
        description: string
        id: number
        title: string
    }[] | null
}

const CampaignsList = ({campaigns, isLoading}: CampaignsListProps) => {
    const [selectedCampaignAddress, setSelectedCampaignAddress] = useState(null)
    const [openedDonationModal, {open: openDonationModal, close: closeDonationModal}] = useDisclosure(false);

    return (
        <>
            <DonationModal address={selectedCampaignAddress} opened={openedDonationModal} close={closeDonationModal}/>
            {isLoading
                ? <Center>
                    <Loader/>
                </Center>
                : <Stack>
                    {campaigns?.map(item =>
                        <CampaignCard
                            openDonationModal={openDonationModal}
                            setSelectedCampaignAddress={setSelectedCampaignAddress}
                            key={item.id} amount={item?.amount} address={item.address}
                            title={item.title} description={item.description}
                        />
                    )}
                </Stack>
            }
        </>
    );
};

export default CampaignsList;