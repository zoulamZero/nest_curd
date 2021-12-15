import { WebSocketGateway, SubscribeMessage, MessageBody } from '@nestjs/websockets';
import { CollaborationService } from './collaboration.service';
import { CreateCollaborationDto } from './dto/create-collaboration.dto';
import { UpdateCollaborationDto } from './dto/update-collaboration.dto';

@WebSocketGateway()
export class CollaborationGateway {
  constructor(private readonly collaborationService: CollaborationService) {}

  @SubscribeMessage('createCollaboration')
  create(@MessageBody() createCollaborationDto: CreateCollaborationDto) {
    return this.collaborationService.create(createCollaborationDto);
  }

  @SubscribeMessage('findAllCollaboration')
  findAll() {
    return this.collaborationService.findAll();
  }

  @SubscribeMessage('findOneCollaboration')
  findOne(@MessageBody() id: number) {
    return this.collaborationService.findOne(id);
  }

  @SubscribeMessage('updateCollaboration')
  update(@MessageBody() updateCollaborationDto: UpdateCollaborationDto) {
    return this.collaborationService.update(updateCollaborationDto.id, updateCollaborationDto);
  }

  @SubscribeMessage('removeCollaboration')
  remove(@MessageBody() id: number) {
    return this.collaborationService.remove(id);
  }
}
