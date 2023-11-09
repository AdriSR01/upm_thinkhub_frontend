import { Component } from '@angular/core';
import { Idea } from '../../core/models/Idea';

@Component({
  selector: 'app-ideas-list',
  templateUrl: './ideas-list.component.html',
  styleUrls: ['./ideas-list.component.scss'],
})
export class IdeasListComponent {
  ideas: Idea[] = [
    {
      title: 'Smart Home Energy Management embedded system',
      description:
        'An intelligent system that optimizes energy usage in homes, reducing electricity bills and environmental impact. This innovative technology utilizes advanced sensors and machine learning algorithms to monitor and control various appliances and lighting, ensuring optimal energy efficiency. By dynamically adjusting power consumption based on user preferences and real-time data, this system not only provides significant cost savings but also contributes to a greener and more sustainable future.',
      likes: 325,
      user_id: 'user1',
      id: 'idea1',
      topic: 'Technological',
    },
    {
      title: 'AI-Powered Healthcare Assistant',
      description:
        'A virtual healthcare assistant that uses AI to provide personalized medical advice and monitor patient health. This cutting-edge technology leverages artificial intelligence to deliver tailor-made health recommendations based on an individuals medical history, lifestyle, and specific health goals. Additionally, it continuously tracks and assesses the patients vital signs, ensuring timely intervention in case of any health anomalies. With its user-friendly interface and round-the-clock availability, this virtual healthcare assistant empowers individuals to take proactive control of their well-being and make informed decisions about their health.',
      likes: 478,
      user_id: 'user2',
      id: 'idea2',
      topic: 'Technological',
    },
    {
      title: 'Urban Vertical Farming',
      description:
        'Revolutionizing urban agriculture by growing crops in vertical, high-tech farms to address food security and sustainability. This innovative approach to farming involves the utilization of advanced vertical farming techniques and state-of-the-art technology to cultivate a wide variety of crops in densely populated urban areas. By optimizing space and resources, these vertical farms are not only enhancing food security but also contributing to a more sustainable and environmentally friendly food production system. With a focus on locally sourced, fresh, and pesticide-free produce, this initiative promises to reshape the way we grow and access food in urban environments, promoting healthier diets and reducing the carbon footprint associated with traditional agriculture.',
      likes: 212,
      user_id: 'user3',
      id: 'idea3',
      topic: 'Technological',
    },
  ];
}
