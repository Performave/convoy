<?php

namespace App\Repositories\Proxmox\Server;

use App\Enums\Server\PowerAction;
use App\Repositories\Proxmox\ProxmoxRepository;

class ProxmoxPowerRepository extends ProxmoxRepository
{
    public function send(PowerAction $action)
    {
        // I added this because I don't like the naming scheme Proxmox has
        switch ($action) {
            case PowerAction::RESTART:
                $parsedAction = 'reboot';
                break;
            case PowerAction::RESET:
                $parsedAction = 'reset';
                break;
            case PowerAction::RESUME:
                $parsedAction = 'resume';
                break;
            case PowerAction::SHUTDOWN:
                $parsedAction = 'shutdown';
                break;
            case PowerAction::START:
                $parsedAction = 'start';
                break;
            case PowerAction::KILL:
                $parsedAction = 'stop';
                break;
            case PowerAction::SUSPEND:
                $parsedAction = 'suspend';
                break;
        }

        $response = $this->getHttpClientWithParams([
            'action' => $parsedAction,
        ])
            ->post('/api2/json/nodes/{node}/qemu/{server}/status/{action}', [
                ...($parsedAction !== 'suspend' ? ['timeout' => 30] : ['skiplock' => false]),
            ])
            ->json();

        return $this->getData($response);
    }
}
