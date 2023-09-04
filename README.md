<img src="https://github.com/doggg5511/NervosDonations/assets/123064471/88fe09b8-ca84-43f7-92e6-56f2ee7efe01" width="500px">

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

<img src="https://github.com/doggg5511/NervosDonations/assets/123064471/c9aba8cf-4640-4077-a53c-6909dd21b359" width="700px">
<img src="https://github.com/doggg5511/NervosDonations/assets/123064471/1061ab6d-d114-4bdc-85cf-1d1b7fa7836f" width="700px">

## CKBull Signer API - Demo screens:

<table>
  <tr>
    <td>1. Sign in request</td>
    <td>2. Pendind transaction</td>
  </tr>
  
  <tr>
    <td><img src="https://github.com/doggg5511/NervosDonations/assets/123064471/e8459a46-3b53-4518-9016-ac1c66587c30" width="250px"></td>
    <td><img src="https://github.com/doggg5511/NervosDonations/assets/123064471/58efd323-2543-4bd5-8562-604c3feb6a00" width="250px"></td>
  </tr>
</table>

<table>
  <tr>
    <td>3. Sign transaction request</td>
    <td>4. Succesful signed tx</td>
  </tr>

  <tr>
    <td><img src="https://github.com/doggg5511/NervosDonations/assets/123064471/f9dbe481-edcc-4e6d-a42b-1889cdf2655c" width="250px"></td>
    <td><img src="https://github.com/doggg5511/NervosDonations/assets/123064471/2e807301-a342-472b-bd52-ae7dc1c0a131" width="250px"></td>
  </tr>
</table>
