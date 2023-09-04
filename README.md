<img src="https://github.com/doggg5511/NervosDonations/assets/123064471/488f2708-e0dc-43d1-8807-141f62d7552a" width="500px">

# Nervos Donations

### Take part in charity campaigns & create your own.

**Nervos Donations** is a dApp on the Nervos Testnet Network with which users can create charity campaigns and also contribute to already created campaigns by transferring CKB coins directly to the campaign wallet.

The process of authorization and signing transactions is provided by the **CKBull Signer API**, which makes the user experience **comfortable**, **fast** and **understandable** for all users.

--------

- Live demo app: https://nervos-donations.netlify.app/
- Video demo: https://www.youtube.com/watch?v=yqb4LpZ0Jlw
  
--------

## Features:

- Login to dApp using CKBull Signer API;
- Option to view all created campaigns;
- Option to create a new donation / charity campaign with following info:
    - Title
    - Description
    - Campaign donation address
    - Target amount (min. 100 CKB)
- Option to donate (min. 100 CKB) to other campaigns using also CKBull Signer API

  
## Built with:

- CKBull Signer API - https://docs.ckbull.app/
- @ckb-lumos/lumos - https://lumos-website.vercel.app/
- React
- Mantine UI
- @supabase/supabase-js


## How to run:

1. Clone this repository `git clone https://github.com/doggg5511/NervosDonations.git`
2. Register a dApp on **CKBull Developer Console** [https://console.ckbull.app/] and obtain the API Key & API Secret.
3. Create an account on Supabase [https://supabase.com/] and create a table:
```sql
  CREATE TABLE campaigns (
   id SERIAL PRIMARY KEY,
   title VARCHAR(100) NOT NULL,
   description VARCHAR(300) NOT NULL,
   address VARCHAR(200) NOT NULL,
   amount NUMERIC NOT NULL
);
```

4. Rename the `env.txt` file to `.env` and set all variables:
```
VITE_API_SECRET = <API_SECRET_OF_YOUR_REGISTERED_DAPP>
VITE_API_KEY = <API_KEY_OF_YOUR_REGISTERED_DAPP>
VITE_SUPABASE_PUBLIC_KEY = <SUPABASE_PUBLIC_KEY>
VITE_SUPABASE_PROJECT_ID = <SUPABASE_PROJECT_ID>
```

5. Install all npm packages with `yarn install` command.
6. Run app with `yarn dev` command

## Frontend App - Demo screens:

<img src="https://github.com/doggg5511/NervosDonations/assets/123064471/803c4a9f-32aa-4ca6-bb7d-5de428b1ca61" width="700px">
<img src="https://github.com/doggg5511/NervosDonations/assets/123064471/590401e0-67f8-4d4c-a027-6503bce88bea" width="700px">


## CKBull Signer API - Demo screens:

<table>
  <tr>
    <td>1. Sign in request</td>
    <td>2. Pendind transaction</td>
  </tr>
  
  <tr>
    <td><img src="https://github.com/doggg5511/NervosDonations/assets/123064471/93d4b3cb-4475-45af-8554-df41fb38b58b" width="250px"></td>
    <td><img src="https://github.com/doggg5511/NervosDonations/assets/123064471/b3bef6bd-84bf-4e96-9f90-fadee1e2525c" width="250px"></td>
  </tr>
</table>

<table>
  <tr>
    <td>3. Sign transaction request</td>
    <td>4. Succesful signed tx</td>
  </tr>
  
  <tr>
    <td><img src="https://github.com/doggg5511/NervosDonations/assets/123064471/606a2db7-cb9d-4979-b7c0-e5a9685698fd" width="250px"></td>
    <td><img src="https://github.com/doggg5511/NervosDonations/assets/123064471/1af64723-aa86-44ac-bf17-1151899ace81" width="250px"></td>
  </tr>
</table>
