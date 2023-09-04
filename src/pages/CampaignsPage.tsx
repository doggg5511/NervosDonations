import React, {useEffect, useState} from 'react';
import {createClient} from "@supabase/supabase-js";
import CampaignsList from "@/components/CampaignsList.tsx";
import {TextInput} from "@mantine/core";
import {useDebouncedValue} from '@mantine/hooks';
import {CampaignType} from "@/types/Campaign.ts";

const supabase = createClient(`https://${import.meta.env.VITE_SUPABASE_PROJECT_ID}.supabase.co`, import.meta.env.VITE_SUPABASE_PUBLIC_KEY);

const CampaignsPage = () => {
    const [isLoading, setIsLaoding] = useState(false)
    const [campaigns, setCampaigns] = useState<CampaignType[] | null>([])
    const [searchValue, setSearchValue] = useState('');
    const [debouncedSearchValue] = useDebouncedValue(searchValue, 200);

    const getCampaigns = async ({searchValue = ''}: { searchValue?: string }) => {
        try {
            setIsLaoding(true)
            const {data} = await supabase
                .from("campaigns")
                .select()
                .ilike((searchValue && searchValue !== '') ? 'title' : '', `%${searchValue}%`)
            setCampaigns(data)
            setIsLaoding(false)
        } catch (e) {
            setIsLaoding(false)
            console.log(e)
        }
    }

    useEffect(() => {
        getCampaigns({searchValue: debouncedSearchValue})
    }, [debouncedSearchValue]);

    useEffect(() => {
        getCampaigns({})
    }, []);

    return (
        <>
            <TextInput
                my={'md'}
                placeholder="Search"
                value={searchValue}
                onChange={e => setSearchValue(e.currentTarget.value)}
            />
            <CampaignsList isLoading={isLoading} campaigns={campaigns}/>
        </>
    );
};

export default CampaignsPage;