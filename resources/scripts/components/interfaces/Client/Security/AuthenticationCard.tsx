import AuthSetting from '@/components/interfaces/Client/Security/AuthSetting.tsx'
import PasskeysContainer from '@/components/interfaces/Client/Security/PasskeysContainer.tsx'

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
                <AuthSetting
                    title={'Password'}
                    description={'Change your account password'}
                    onClick={() => {}}
                />
                <Separator />
                <AuthSetting
                    title={'Authenticator'}
                    description={'Time-based verification codes using an app'}
                    onClick={() => {}}
                />
                <Separator />
                <PasskeysContainer />
            </CardContent>
        </Card>
    )
}

export default AuthenticationCard
