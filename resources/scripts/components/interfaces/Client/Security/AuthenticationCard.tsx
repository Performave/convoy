import AuthenticatorContainer from '@/components/interfaces/Client/Security/AuthenticatorContainer.tsx'
import PasskeysContainer from '@/components/interfaces/Client/Security/PasskeysContainer.tsx'
import PasswordChangeDialog from '@/components/interfaces/Client/Security/PasswordChangeDialog.tsx'

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/Card'
import { Separator } from '@/components/ui/Separator.tsx'


const AuthenticationCard = () => {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Authentication</CardTitle>
                <CardDescription>
                    Manage your account authentication settings
                </CardDescription>
            </CardHeader>
            <CardContent className={'space-y-3'}>
                <PasswordChangeDialog />
                <Separator />
                <AuthenticatorContainer />
                <Separator />
                <PasskeysContainer />
            </CardContent>
        </Card>
    )
}

export default AuthenticationCard
