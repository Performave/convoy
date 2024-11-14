<?php

namespace App\Repositories\Proxmox\Server;

use App\Repositories\Proxmox\ProxmoxRepository;

class ProxmoxSnapshotRepository extends ProxmoxRepository
{
    public function getSnapshots()
    {
        $response = $this->getHttpClientWithParams()
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
