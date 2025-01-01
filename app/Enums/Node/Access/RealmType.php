<?php

namespace App\Enums\Node\Access;

enum RealmType: string
{
    case PAM = 'pam';
    case PVE = 'pve';
    case LDAP = 'ldap';
    case AD = 'ad';
    case OPEN_ID = 'openid';
}
