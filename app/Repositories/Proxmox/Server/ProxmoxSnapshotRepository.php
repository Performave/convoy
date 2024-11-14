<?php

namespace App\Repositories\Proxmox\Server;

use App\Models\Server;
use App\Repositories\Proxmox\ProxmoxRepository;
use Webmozart\Assert\Assert;

class ProxmoxSnapshotRepository extends ProxmoxRepository
{
    public function getSnapshots()
    {
        Assert::isInstanceOf($this->server, Server::class);

        $response = $this->getHttpClient()
            ->withUrlParameters([
                'node' => $this->node->cluster,
                'server' => $this->server->vmid,
            ])
            ->get('/api2/json/nodes/{node}/qemu/{server}/snapshot')
            ->json();

        return $this->getData($response);
    }

    public function create(string $name)
    {
        $response = $this->getHttpClientWithParams()
            ->post('/api2/json/nodes/{node}/qemu/{server}/snapshot', [
                'snapname' => $name,
            ])
            ->json();

        return $this->getData($response);
    }

    public function restore(string $name)
    {
        $response = $this->getHttpClientWithParams([
            'snapshot' => $name,
        ])
            ->post('/api2/json/nodes/{node}/qemu/{server}/snapshot/{snapshot}/rollback')
            ->json();

        return $this->getData($response);
    }

    public function delete(string $name)
    {
        $response = $this->getHttpClientWithParams([
            'snapshot' => $name,
        ])
            ->delete('/api2/json/nodes/{node}/qemu/{server}/snapshot/{snapshot}')
            ->json();

        return $this->getData($response);
    }
}
